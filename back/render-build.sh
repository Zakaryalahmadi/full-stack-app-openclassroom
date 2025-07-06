#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Try to use Maven wrapper first, fallback to mvn
if [ -f "./mvnw" ] && [ -x "./mvnw" ]; then
    echo "Using Maven wrapper..."
    ./mvnw clean package -DskipTests
elif command -v mvn &> /dev/null; then
    echo "Using system Maven..."
    mvn clean package -DskipTests
else
    echo "Error: Neither Maven wrapper nor system Maven found"
    exit 1
fi

# Check if JAR file was created
if [ ! -f target/*.jar ]; then
    echo "Error: JAR file not found in target directory"
    exit 1
fi

# Copy the JAR file to the expected location
echo "Copying JAR file..."
cp target/*.jar app.jar

echo "Build completed successfully!" 