FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# 👇 ADD THIS LINE (VERY IMPORTANT)
RUN chmod +x mvnw

# Build
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/estateflow-backend-0.0.1-SNAPSHOT.jar"]