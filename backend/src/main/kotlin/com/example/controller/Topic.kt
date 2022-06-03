package com.example.controller

import org.kodein.di.*

interface IRandomDice {
    fun bar()
    fun foo() {
        // optional body
    }
}

class RandomDice: IRandomDice {
    override fun bar(){

    }
    override fun foo(){

    }
}

val di = DI {
    bind<IRandomDice> { provider { RandomDice() } }
}


