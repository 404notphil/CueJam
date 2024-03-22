package com.noteprompter

import android.media.AudioAttributes
import android.media.SoundPool
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MetronomeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private var bpm = 200 // default of 100bpm
    private val beatInterval get() = 60000 / bpm // Interval in milliseconds
    private var isPlaying = false
    private val handler = Handler(Looper.getMainLooper())
    private var soundPool: SoundPool? = null
    private var soundID: Int = 0

    init {
        val audioAttributes = AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .build()

        soundPool = SoundPool.Builder()
            .setMaxStreams(1)
            .setAudioAttributes(audioAttributes)
            .build()

        // Assuming you have a beat sound in your 'res/raw' folder named 'metronome_beat.wav'
        soundID = soundPool?.load(reactContext, R.raw.soft_knock, 1) ?: 0
    }

    override fun getName() = "MetronomeModule"

    @ReactMethod
    fun start() {
        isPlaying = true
        handler.post(metronomeRunnable)
        Log.d("12345", "started")
    }

    @ReactMethod
    fun stop() {
        isPlaying = false
        handler.removeCallbacks(metronomeRunnable)
        Log.d("12345", "stopped")
    }

    @ReactMethod
    fun setTempo(tempo: Int) {
        bpm = tempo
        Log.d("12345", "setTempo: $tempo")
    }

    private val metronomeRunnable = object : Runnable {
        override fun run() {
            if (!isPlaying) return
            // Logic to play the beat sound
            playBeat()

            // Schedule the next beat
            val nextBeat = SystemClock.uptimeMillis() + beatInterval
            handler.postAtTime(this, nextBeat)
        }
    }

    private fun playBeat() {
        soundPool?.play(soundID, 1f, 1f, 0, 0, 1f)
    }

    fun release() {
        soundPool?.release()
        soundPool = null
    }
}