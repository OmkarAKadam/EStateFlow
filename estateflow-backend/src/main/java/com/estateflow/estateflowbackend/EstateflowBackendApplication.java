package com.estateflow.estateflowbackend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EstateflowBackendApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        String dbUrl = dotenv.get("DB_URL");
        String dbUser = dotenv.get("DB_USERNAME");
        String dbPass = dotenv.get("DB_PASSWORD");
        String jwtSecret = dotenv.get("JWT_SECRET");
        String portStr = dotenv.get("PORT");

        if (portStr != null && !portStr.isBlank()) {
            System.setProperty("PORT", portStr);
        }
        if (dbUrl != null) System.setProperty("DB_URL", dbUrl);
        if (dbUser != null) System.setProperty("DB_USERNAME", dbUser);
        if (dbPass != null) System.setProperty("DB_PASSWORD", dbPass);
        if (jwtSecret != null) System.setProperty("JWT_SECRET", jwtSecret);

        SpringApplication.run(EstateflowBackendApplication.class, args);
    }

}
