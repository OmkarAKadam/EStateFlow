FROM ubuntu:latest
LABEL authors="kaizenki"

ENTRYPOINT ["top", "-b"]
# Use Java 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Build the app
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run jar
CMD ["java", "-jar", "target/estateflow-backend-0.0.1-SNAPSHOT.jar"]