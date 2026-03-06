# EstateFlow

EstateFlow is a full-stack property listing platform developed as part of an internship project.  
The system allows users to register, authenticate, and manage property listings securely.

The backend is built using **Spring Boot with JWT-based authentication**, while the frontend is implemented separately.

---

# Project Structure


EstateFlow

├── backend → Spring Boot REST API

├── frontend → Frontend 
application (Vite / React)

├── docs → Planning documents (scope, architecture, data model)

├── postman → Postman collection for testing API endpoints

└── README.md


---

# Technology Stack

## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- Lombok

## Frontend
- React
- Vite
- JavaScript
- CSS

## Tools
- Postman
- Git
- Docker (planned)

---

# Features Implemented

## User Module
- User registration
- Secure login with JWT authentication
- Password hashing using BCrypt
- DTO-based API responses

## Property Module
- Create property listings
- Retrieve all properties
- Retrieve properties owned by logged-in user
- Retrieve property by ID
- Delete property

## Security
- JWT-based authentication
- Protected API endpoints
- Ownership-based property creation

---

# How Authentication Works

1. User logs in using `/api/auth/login`
2. Server returns a **JWT token**
3. Client sends the token in request headers

Example:


Authorization: Bearer <token>


Spring Security verifies the token and sets the authenticated user in the **SecurityContext**.

---

# Running the Backend

## 1. Clone the repository


git clone <repository-url>


## 2. Navigate to backend


cd backend


## 3. Configure database

Create a MySQL database:


CREATE DATABASE estateflow;


Update `application.properties` if required.

---

## 4. Run the application


mvn spring-boot:run


Server will start at:


http://localhost:8080


---

# Testing APIs

A Postman collection is included:


postman/estateflow-api.postman_collection.json


Import this collection into **Postman**.

Recommended testing flow:

1. Register User  
2. Login User  
3. Create Property  
4. Get Properties  
5. Get My Properties  
6. Delete Property  

The login request automatically stores the **JWT token** for authenticated requests.

---

# API Endpoints

## Authentication


POST /api/auth/register
POST /api/auth/login


## Users


GET /api/users
GET /api/users/{id}


## Properties


POST /api/properties
GET /api/properties
GET /api/properties/my-properties
GET /api/properties/{id}
DELETE /api/properties/{id}


---

# Current Development Stage

- User module completed
- Authentication system implemented
- Property module implemented
- DTO architecture applied
- Validation implemented
- API testing configured with Postman

---

# Future Improvements

- Property image upload
- Messaging between users
- Favorites system
- Pagination and filtering
- Dockerized deployment
- Frontend integration

---

# Author

**Omkar Kadam**  
BCA Student — MSU Vadodara