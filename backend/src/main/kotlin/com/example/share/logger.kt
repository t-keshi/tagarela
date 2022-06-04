package com.example.share

import mu.KotlinLogging

class Logger {
    companion object {
        @Suppress("JAVA_CLASS_ON_COMPANION")
        @JvmStatic
        private val logger = KotlinLogging.logger {javaClass.enclosingClass}
    }

    fun log(message: String, severity: String = "error") {
        when(severity){
            "error" -> logger.error(message)
            "warn" -> logger.warn(message)
            else -> logger.info(message)
        }
    }
}