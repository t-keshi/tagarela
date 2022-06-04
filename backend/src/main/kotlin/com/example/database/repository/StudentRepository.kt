package com.example.database.repository

import com.example.database.DatabaseManager
import com.example.database.`interface`.IStudentRepository
import com.example.domain.model.Student
import org.ktorm.dsl.*
import org.ktorm.entity.Entity
import org.ktorm.entity.find
import org.ktorm.entity.sequenceOf
import org.ktorm.schema.BaseTable
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.*
import java.util.*


interface DBStudentEntity: Entity<DBStudentEntity> {
    companion object : Entity.Factory<DBStudentEntity>()

    val id: Int
    val name: String
}

object UsersTable: Table<DBStudentEntity>("users"){
    val id = int("id").primaryKey().bindTo{it.id}
    val name = varchar("name").bindTo{it.name}
}

class StudentRepository: IStudentRepository {
    private val db = DatabaseManager().dbInstance

    override fun getStudent(): Student {
        println("### database ###")
        val query = db.sequenceOf(UsersTable)?.find{ it.id eq 1}?.name
        println("### $query ###")

        return Student(id = 1, name = query?:"")
    }
}