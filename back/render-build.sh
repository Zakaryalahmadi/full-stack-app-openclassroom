#!/bin/bash

# Build the application
./mvnw clean package -DskipTests

# Copy the JAR file to the expected location
cp target/*.jar app.jar 