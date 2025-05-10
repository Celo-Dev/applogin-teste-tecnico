package com.applogin

import android.os.Build
import com.facebook.react.bridge.*

class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DeviceInfoModule"

    @ReactMethod
    fun getManufacturer(promise: Promise) {
        val manufacturer = Build.MANUFACTURER
        promise.resolve(manufacturer)
    }

    @ReactMethod
    fun getSystemVersion(promise: Promise) {
        val version = Build.VERSION.RELEASE
        promise.resolve(version)
    }
}
