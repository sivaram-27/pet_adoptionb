# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the project files
COPY . .

# Install Maven and build the application
RUN apt-get update \
    && apt-get install -y maven \
    && mvn clean package -DskipTests

# Expose the port
EXPOSE 10000

# Run the application
CMD ["java", "-jar", "target/pet-adoption-backend-0.0.1-SNAPSHOT.jar"] 