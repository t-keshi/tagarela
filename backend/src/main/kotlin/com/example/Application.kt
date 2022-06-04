package com.example

import com.example.controller.students
import com.example.database.DatabaseManager
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.locations.*
import io.ktor.server.routing.*

fun main(args: Array<String>): Unit = EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
fun Application.module() {
    val port = environment.config.property("ktor.deployment.port").getString().toInt()
    val watch = environment.config.property("ktor.deployment.watch").getList()
    println(watch)

    embeddedServer(Netty, port = port, watchPaths = watch) {
        install(Locations)

        routing {
            students()
        }
    }.start(wait = true)
}