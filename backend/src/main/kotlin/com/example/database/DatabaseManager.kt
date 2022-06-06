package com.example.database

import org.ktorm.database.Database
import org.ktorm.support.mysql.MySqlDialect

class DatabaseManager {
    // config
    private val url = System.getenv("DB_URL")
    private val user = System.getenv("DB_USER_NAME")
    private val password = System.getenv("DB_PASSWORD")

    // database
    val dbInstance: Database = Database.connect(
        url = url,
        driver = "com.mysql.cj.jdbc.Driver",
        user = user,
        password = password,
        dialect = MySqlDialect()
    )
}