package com.example.database.repository

import com.example.database.DatabaseManager
import com.example.database.`interface`.IStudentRepository
import com.example.domain.model.Student
import com.example.share.Logger
import io.ktor.server.plugins.*
import org.ktorm.dsl.eq
import org.ktorm.dsl.insert
import org.ktorm.entity.Entity
import org.ktorm.entity.find
import org.ktorm.entity.sequenceOf
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.varchar

interface DBStudentEntity : Entity<DBStudentEntity> {
    companion object : Entity.Factory<DBStudentEntity>()

    val id: Int
    val name: String
    val password: String
    val email: String
}

object UsersTable : Table<DBStudentEntity>("users") {
    val id = int("id").primaryKey().bindTo { it.id }
    val name = varchar("name").bindTo { it.name }
    val password = varchar("password").bindTo { it.password }
    val email = varchar("email").bindTo { it.email }
}

class StudentRepository : IStudentRepository {
    private val db = DatabaseManager().dbInstance

    override fun getStudent(): Student {
        Logger().log("### database ###", "info")

        try {
            val res = db.sequenceOf(UsersTable).find { it.id eq 1 } ?: throw NotFoundException("student is not found")
            return Student(id = res.id, name = res.name, password = res.password, email = res.email)
        } catch (e: Exception) {
            throw IllegalStateException("failed to get student")
        }
    }

    override fun createStudent(name: String, password: String, email: String) {
        Logger().log("### database ###", "info")

        try {
            db.insert(UsersTable) {
                set(it.name, name)
                set(it.password, password)
                set(it.email, email)
            }
        } catch (e: Exception) {
            Logger().log("name: $name, password: $password, email: $email")
            throw IllegalStateException("failed to create student")
        }
    }
}