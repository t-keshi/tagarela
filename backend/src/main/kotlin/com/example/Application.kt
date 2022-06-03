package com.example

import com.example.controller.students
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.locations.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(Locations)

        routing {
            students()
        }
    }.start(wait = true)
}
