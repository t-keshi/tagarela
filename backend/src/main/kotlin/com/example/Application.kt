package com.example

import com.example.controller.students
import com.example.controller.topics
import com.fasterxml.jackson.databind.SerializationFeature
import io.ktor.serialization.jackson.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.locations.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.routing.*

fun main(args: Array<String>): Unit = EngineMain.main(args)

@Suppress("unused")
@kotlin.jvm.JvmOverloads
fun Application.module() {
    val port = System.getenv("PORT")?.toInt() ?: 8080

    embeddedServer(Netty, port = port, watchPaths = listOf("build")) {
        install(Locations)
        install(ContentNegotiation) {
            jackson {
                configure(SerializationFeature.INDENT_OUTPUT, true)
            }
        }

        routing {
            students()
            topics()
        }
    }.start(wait = true)
}