package com.example

import com.example.controller.students
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlin.test.*
import io.ktor.server.testing.*
import com.example.plugins.*
import io.ktor.server.locations.*

class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
        install(Locations)

        application {
            routing {
                students()
            }
        }
        client.get("/api/student").apply {
            assertEquals(HttpStatusCode.OK, status)
        }
    }
}