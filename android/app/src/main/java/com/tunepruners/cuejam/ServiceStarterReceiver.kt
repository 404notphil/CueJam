package com.tunepruners.cuejam

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat

class ServiceStarterReceiver: BroadcastReceiver() {
    override fun onReceive(p0: Context, p1: Intent?) {
        val intent = Intent(p0, MetronomeService::class.java)
        ContextCompat.startForegroundService(p0, intent)
    }
}