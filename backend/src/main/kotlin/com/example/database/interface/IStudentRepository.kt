package com.example.database.`interface`

import com.example.domain.model.Student

interface IStudentRepository {
    fun getStudent(): Student
}