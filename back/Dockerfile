# Use OpenJDK 21 as base image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw ./
COPY mvnw.cmd ./
COPY .mvn .mvn
COPY pom.xml ./

# Give execution permission to mvnw
RUN chmod +x ./mvnw

# Download dependencies (for better layer caching)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
CMD ["java", "-jar", "target/mdd-api-0.0.1-SNAPSHOT.jar"] 