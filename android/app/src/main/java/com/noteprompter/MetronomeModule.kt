package com.noteprompter

import android.content.res.Resources
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit


@RequiresApi(Build.VERSION_CODES.M)
class MetronomeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private var isPlaying: Boolean = false
    private var soundData: ByteArray? = null
    private var bpm = 120 // default of 120bpm
    private val beatInterval get() = 60000 / bpm // Interval in milliseconds
    private var scheduler = Executors.newSingleThreadScheduledExecutor()
    private var scheduledFuture: ScheduledFuture<*>? = null
    private val sampleRate = 44100 // Common sample rate for audio playback
    private var audioTrack: AudioTrack? = null
    private var tone: ByteArray? = null
    private val durations = arrayListOf<Long>()
    private val plays = arrayListOf<Long>()

    init {
        audioTrack = AudioTrack.Builder()
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .build()
            )
            .setAudioFormat(
                AudioFormat.Builder()
                    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                    .setSampleRate(44100)
                    .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                    .build()
            )
            .setBufferSizeInBytes(
                AudioTrack.getMinBufferSize(
                    sampleRate,
                    AudioFormat.CHANNEL_OUT_MONO,
                    AudioFormat.ENCODING_PCM_16BIT
                )
            )
            .build()
    }

    override fun getName() = "MetronomeModule"

    private fun emitEvent() {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("EventName", null) // You can pass a payload instead of `null`.
    }

    @ReactMethod
    fun triggerEvent() {
        emitEvent()
    }

    @ReactMethod
    fun loadSoundIntoByteArray() {
        val resourceId: Int = R.raw.soft_knock
        val resources: Resources = reactApplicationContext.resources
        val inputStream = resources.openRawResource(resourceId)
        val buffer = ByteArrayOutputStream()
        val data = ByteArray(16384) // Buffer size

        try {
            var bytesRead: Int
            while (inputStream.read(data, 0, data.size).also { bytesRead = it } != -1) {
                buffer.write(data, 0, bytesRead)
            }
        } catch (e: IOException) {
            e.printStackTrace()
        } finally {
            try {
                inputStream.close()
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }

        soundData = buffer.toByteArray()
    }

    @ReactMethod
    fun start() {
        stop()

        if (soundData == null) loadSoundIntoByteArray()

        isPlaying = true
        CoroutineScope(Dispatchers.Main).launch {
            var isFirstBeat = true

            preWarmAudioTrack()

            scheduledFuture = scheduler.scheduleAtFixedRate({
                playBeat(isFirstBeat)
                isFirstBeat = false
            }, 4, beatInterval.toLong(), TimeUnit.MILLISECONDS)
            Log.d("12345", "started")
        }
    }

    @ReactMethod
    fun stop() {
        isPlaying = false
        scheduledFuture?.cancel(false)
        audioTrack?.pause()
        audioTrack?.flush()
        Log.d("12345", "stopped")
    }

    @ReactMethod
    fun setTempo(tempo: Int) {
        if (isPlaying) {
            Log.d("12345", "setTempo (playing): $tempo")
            stop()
            bpm = tempo
            start()
        } else {
            bpm = tempo
            Log.d("12345", "setTempo (not playing): $tempo")
        }

        Log.d("12345", "setTempo: $tempo")
    }

    private fun playBeat(firstBeat: Boolean = false) {
        soundData?.let {
            audioTrack?.play()
            audioTrack?.write(it, 0, it.size)
        } ?: Log.e("MetronomeModule", "Error loading sound data")
        plays.add(System.nanoTime())
        if (plays.size > 1) {
            durations.add(plays.last() - plays[plays.lastIndex - 1])
            Log.d("12345", "duration = ${durations.last() / 1_000_000L}")
        }
    }

    private fun preWarmAudioTrack() {
        // Create a short, silent PCM buffer
        val silentData = ByteArray(44100) // 1 second of silence at 44100 sample rate
        audioTrack?.play()
        audioTrack?.write(silentData, 0, silentData.size)
        audioTrack?.pause() // Pause playback; resources are now allocated
        audioTrack?.flush() // Clear the buffer
    }


    @ReactMethod
    fun cleanup() {
        audioTrack?.release()
        scheduler.shutdown()
    }
}