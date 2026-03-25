# 🚀 EstateFlow — Full Stack Property Management Platform

EstateFlow is a full-stack web application designed to simplify property discovery, listing management, and user communication within a unified platform.

Built as part of an internship project, this system demonstrates a production-oriented architecture using **Spring Boot (backend)** and **React + Vite (frontend)**, with secure authentication and role-based access control.

---

# 🧠 Overview

EstateFlow enables:

* Property owners to list and manage properties
* Tenants to explore listings and connect with owners
* Secure communication through an internal messaging system
* Personalized experience via favorites and role-based features

This project reflects real-world system design principles including:

* RESTful API architecture
* JWT-based authentication
* Modular frontend structure
* Scalable backend design

---

# 🏗️ Project Structure

```
EstateFlow/
│
├── backend/        # Spring Boot REST API
├── frontend/       # React + Vite application
├── docs/           # Architecture & planning
├── postman/        # API testing collection
└── README.md
```

---

# ⚙️ Tech Stack

## Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* MySQL
* Lombok

## Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Axios
* React Router

## Tools

* Git
* Postman
* Docker (planned)

---

# 🔐 Authentication & Security

* JWT-based authentication
* Stateless session management
* BCrypt password hashing
* Role-based authorization (OWNER / TENANT)
* Protected API endpoints via Spring Security

### Authentication Flow

1. User logs in → `/api/auth/login`
2. Server returns JWT token
3. Token stored on client
4. Token attached in requests:

```
Authorization: Bearer <token>
```

5. Backend validates token and sets user context

---

# 👥 User Roles

## Guest

* Browse properties
* Register / Login

## Tenant

* Search properties
* Add to favorites
* Send messages

## Owner

* Create listings
* Manage properties
* Receive messages

---

# 🧩 Core Features

## 👤 User Module

* Registration & login
* JWT authentication
* Profile management
* Input validation

---

## 🏠 Property Module

* Create / update / delete listings
* Pagination support
* Owner-specific property management
* Search filters (location, price, type)

---

## ❤️ Favorites Module

* Add/remove favorites
* Personalized property list

---

## 💬 Messaging Module

* Send messages to property owners
* Inbox & sent messages
* Conversation threads
* Read/unread status

---

## 🖼️ Image Upload

* Upload property images
* File validation (type + size)
* Static file serving

---

# 🎨 Frontend Architecture

```
src/
│
├── api/            # Axios config
├── services/       # API service layer
├── context/        # Auth state management
├── hooks/          # Custom hooks
├── components/     # Reusable UI
├── pages/          # Application views
├── routes/         # Routing config
│
├── App.jsx
└── main.jsx
```

### Key Patterns

* Centralized API handling via Axios
* Context-based authentication state
* Protected routes with role validation
* Component-driven UI structure

---

# 🔍 Property Search

Supported filters:

* Location
* Price range
* Property type

Endpoints:

```
GET /api/properties/search/location
GET /api/properties/search/price
GET /api/properties/search/type
```

---

# 🚀 Running the Project

## Backend Setup

```bash
git clone <repository-url>
cd backend
```

### Configure MySQL

```sql
CREATE DATABASE estateflow;
```

Update credentials in `application.properties`

### Run Backend

```bash
mvn spring-boot:run
```

Server:

```
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🧪 API Testing

Postman collection included:

```
postman/estateflow-api.postman_collection.json
```

### Suggested Testing Flow

1. Register user
2. Login user
3. Create property
4. Fetch properties
5. Add favorite
6. Send message

---

# 📦 Current Capabilities

* JWT Authentication
* Role-based access control
* Property listing & management
* Image uploads
* Messaging system
* Favorites system
* Pagination & filtering
* Protected frontend routes

This project functions as a **complete full-stack MVP for a property marketplace**.

---

# 🔮 Future Improvements

* Real-time chat (WebSocket)
* Notification system
* Advanced filtering (combined queries)
* Admin dashboard
* Cloud storage for images (S3 / Cloudinary)
* Dockerized deployment

---

# 👨‍💻 Author

**Omkar Kadam**
BCA Student — MSU Vadodara
Aspiring Full Stack Developer & Game Developer

---
