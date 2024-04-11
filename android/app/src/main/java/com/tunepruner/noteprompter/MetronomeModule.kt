package com.tunepruner.noteprompter

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

private const val TAG = "12345"

class MetronomeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), MetronomeService.TickListener {
    var isBound = false
    var metronomeService: MetronomeService? = null
    private val connection: ServiceConnection = object : ServiceConnection {
        override fun onServiceConnected(className: ComponentName, service: IBinder) {
            metronomeService = (service as MetronomeService.MetronomeBinder).getService()
            metronomeService?.addTickListener(this@MetronomeModule)
            isBound = true
        }

        override fun onServiceDisconnected(className: ComponentName) {
            metronomeService = null
            isBound = false
        }
    }

    @ReactMethod
    fun initializeMetronomeService() {
        val intent = Intent("com.tunepruner.noteprompter.START_METRONOME_SERVICE")
        reactApplicationContext.sendBroadcast(intent)
        bindService()
    }

    //    @ReactMethod
    private fun bindService() {
        Intent(reactApplicationContext, MetronomeService::class.java).also { intent ->
            reactApplicationContext.bindService(intent, connection, Context.BIND_AUTO_CREATE)
        }
    }

    @ReactMethod
    fun unbindService() {
        if (isBound) {
            reactApplicationContext.unbindService(connection)
            isBound = false
        }
    }

    override fun getName() = "MetronomeModule"

    @ReactMethod
    fun start() {
        Log.d(TAG, "start (native module): the service is null? -> ${metronomeService == null}")
        metronomeService?.play()
    }

    @ReactMethod
    fun stop() {
        metronomeService?.pause()
    }

    @ReactMethod
    fun setTempo(tempo: Int) {
        metronomeService?.setBpm(tempo)
    }

    @ReactMethod
    fun setBeatsPerPrompt(beatsPerPrompt: Int) {
        metronomeService?.beatsPerMeasure = beatsPerPrompt
    }

    private fun notifyUiOfClickEvent(currentBeat: Int) {
        val json = """
            {"currentBeat":"$currentBeat"}
        """.trimIndent()
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("ClickEvent", json)
    }

    @ReactMethod
    fun cleanup() {
        metronomeService?.removeTickListener(this)
    }

    override fun onTick(interval: Int) {
        notifyUiOfClickEvent(interval)
    }
}
