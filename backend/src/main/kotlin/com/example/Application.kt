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

@Suppress("unused") // Referenced in application.conf
fun Application.module() {
    val port = environment.config.property("ktor.deployment.port").getString().toInt()
    val watch = environment.config.property("ktor.deployment.watch").getList()
    println(watch)

    embeddedServer(Netty, port = port, watchPaths = watch) {
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