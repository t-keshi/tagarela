val ktorVersion: String by project
val kotlinVersion: String by project
val logbackVersion: String by project
val jdbiVersion: String by project
val ktormVersion: String by project
val isDevelopment: String by project

plugins {
    application
    kotlin("jvm") version "1.6.21"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.6.21"
    id("com.github.johnrengelman.shadow") version "5.1.0"
    id("com.google.cloud.tools.appengine") version "2.1.0"
}

group = "com.example"
version = "0.0.1"
application {
    project.setProperty("mainClassName", "com.example.ApplicationKt")
    mainClass.set("com.example.ApplicationKt")

    val isD = if (isDevelopment === "true") "true" else "false"
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isD")
}

repositories {
    mavenCentral()
    maven { url = uri("https://maven.pkg.jetbrains.space/public/p/ktor/eap") }
    maven { url = uri("https://dl.bintray.com/kotlin/exposed") }
}

dependencies {
    // ktor
    implementation("io.ktor:ktor-server-core-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-netty-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-locations:$ktorVersion")
    implementation("io.ktor:ktor-serialization-jackson:$ktorVersion")

    // jbdi
    implementation(platform("org.jdbi:jdbi3-bom:$jdbiVersion"))
    implementation("org.jdbi:jdbi3-core:$jdbiVersion")
    implementation("org.jdbi:jdbi3-kotlin:$jdbiVersion")
    implementation("org.jdbi:jdbi3-postgres:$jdbiVersion")

    implementation("ch.qos.logback:logback-classic:$logbackVersion")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktorVersion")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlinVersion")

    implementation("org.kodein.di:kodein-di:7.12.0")

    implementation("org.ktorm:ktorm-core:${ktormVersion}")
    implementation("org.ktorm:ktorm-support-mysql:${ktormVersion}")

    implementation("mysql:mysql-connector-java:8.0.29")

    implementation("io.github.microutils:kotlin-logging-jvm:2.1.23")
}


tasks.assemble {
    dependsOn(tasks.shadowJar) // assembleの依存タスクとしてshadowJarを実行する。
}

tasks.shadowJar {
    archiveClassifier.set("") // fat jarを単独のjarと同じ名前にして上書きする。
}

appengine {
    stage {
        setAppEngineDirectory(".") // app.yamlをトップディレクトリに置く
    }
    deploy {
        projectId = "GCLOUD_CONFIG"
        version = "GCLOUD_CONFIG"
    }
}