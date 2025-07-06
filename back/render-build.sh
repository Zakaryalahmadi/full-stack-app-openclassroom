#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Configure Java environment for Render
export JAVA_VERSION=21
export JAVA_HOME="/opt/java/openjdk"
export PATH="$JAVA_HOME/bin:$PATH"

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "Java not found, trying to locate it..."
    
    # Common Java locations on Render
    JAVA_LOCATIONS=(
        "/usr/lib/jvm/java-21-openjdk-amd64"
        "/usr/lib/jvm/java-21-openjdk"
        "/usr/lib/jvm/java-17-openjdk-amd64"
        "/usr/lib/jvm/java-17-openjdk"
        "/usr/lib/jvm/java-11-openjdk-amd64"
        "/usr/lib/jvm/java-11-openjdk"
        "/opt/java/openjdk"
    )
    
    for java_path in "${JAVA_LOCATIONS[@]}"; do
        if [ -d "$java_path" ]; then
            export JAVA_HOME="$java_path"
            export PATH="$JAVA_HOME/bin:$PATH"
            echo "Found Java at: $JAVA_HOME"
            break
        fi
    done
fi

# Display Java version
echo "Java version:"
java -version

echo "JAVA_HOME: $JAVA_HOME"
echo "PATH: $PATH"

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