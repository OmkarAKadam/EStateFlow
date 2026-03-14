# EstateFlow

EstateFlow is a full-stack property listing platform developed as part of an internship project.  
The system allows users to register, authenticate, browse properties, manage listings, and communicate with property owners through a secure messaging system.

The backend is implemented using **Spring Boot with JWT-based authentication**, while the frontend is built using **React and Vite**.

The application demonstrates a complete **RESTful architecture with role-based access control, secure authentication, and modular frontend architecture**.

---

# Project Structure

```
EstateFlow
│
├── backend                # Spring Boot REST API
├── frontend               # React + Vite frontend application
├── docs                   # Architecture and planning documents
├── postman                # Postman collection for API testing
└── README.md
```

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
- Axios  
- React Router  

## Tools

- Git  
- Postman  
- Docker (planned)  

---

# Backend Features

## User Module

- User registration  
- Secure login with JWT authentication  
- Password hashing using BCrypt  
- DTO-based API responses  
- Input validation  

---

## Property Module

- Create property listings  
- Retrieve all properties  
- Retrieve properties owned by logged-in user  
- Retrieve property by ID  
- Delete property  
- Pagination support  

---

## Favorites Module

Users can save properties for quick access.

Features:

- Add property to favorites  
- View favorite properties  
- Remove property from favorites  

---

## Messaging Module

Users can communicate with property owners through an internal messaging system.

Features:

- Send messages regarding properties  
- View received messages  
- View sent messages  
- Mark messages as read  
- Reply to messages  

---

## Security

- JWT-based authentication  
- Protected API endpoints  
- Role-based access control  
- Ownership-based property management  
- Spring Security configuration  

---

# Frontend Features

The frontend consumes backend REST APIs and provides a complete user interface for interacting with the platform.

---

# Frontend Architecture

The frontend project is structured using modular components and service-based API communication.

```
src
│
├── api
│   axios.js
│
├── services
│   authService.js
│   propertyService.js
│   favoriteService.js
│   messageService.js
│   imageService.js
│
├── context
│   AuthContext.jsx
│
├── hooks
│   useAuth.js
│
├── components
│   Navbar.jsx
│   PropertyCard.jsx
│   ProtectedRoute.jsx
│
├── pages
│   LoginPage.jsx
│   RegisterPage.jsx
│   PropertyListPage.jsx
│   PropertyDetailPage.jsx
│   CreatePropertyPage.jsx
│   MyPropertiesPage.jsx
│   FavoritesPage.jsx
│   InboxPage.jsx
│   SentMessagesPage.jsx
│
├── routes
│   AppRoutes.jsx
│
├── App.jsx
└── main.jsx
```

Axios is configured globally to automatically attach the **JWT token** to authenticated API requests.

---

# Authentication Flow

1. User logs in using:

```
POST /api/auth/login
```

2. The server returns a **JWT token**

3. The client stores the token and sends it with requests:

```
Authorization: Bearer <token>
```

4. Spring Security validates the token and sets the authenticated user in the **SecurityContext**.

---

# Role-Based Access

The application supports multiple roles.

## Guest

- View property listings  
- Register  
- Login  

## Tenant

- Browse properties  
- Save properties to favorites  
- Send messages to property owners  

## Owner

- Create property listings  
- Manage personal property listings  
- Receive messages from tenants  

---

# Implemented Frontend Pages

## Authentication

```
LoginPage.jsx
RegisterPage.jsx
```

## Property Browsing

```
PropertyListPage.jsx
PropertyDetailPage.jsx
```

## Owner Features

```
CreatePropertyPage.jsx
MyPropertiesPage.jsx
```

## User Features

```
FavoritesPage.jsx
InboxPage.jsx
SentMessagesPage.jsx
```

---

# Property Search

Users can search and filter property listings using multiple criteria.

Supported filters:

- Location  
- Price range  
- Property type  

Backend endpoints used:

```
GET /api/properties/search/location
GET /api/properties/search/price
GET /api/properties/search/type
```

---

# Image Upload

Property owners can upload images for property listings.

Endpoint used:

```
POST /api/property-images/{propertyId}
```

Images are stored on the server and served through a static endpoint.

---

# Running the Backend

## 1. Clone the repository

```
git clone <repository-url>
```

## 2. Navigate to backend

```
cd backend
```

## 3. Configure database

Create a MySQL database:

```
CREATE DATABASE estateflow;
```

Update database credentials in:

```
application.properties
```

## 4. Run the application

```
mvn spring-boot:run
```

Server will start at:

```
http://localhost:8080
```

---

# Running the Frontend

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# API Testing

A Postman collection is included for testing backend endpoints.

```
postman/estateflow-api.postman_collection.json
```

Recommended testing flow:

1. Register User  
2. Login User  
3. Create Property  
4. Get Properties  
5. Add Favorite  
6. Send Message  

---

# Current Platform Capabilities

The EstateFlow platform currently supports:

- User registration and login  
- JWT authentication  
- Role-based navigation  
- Protected routes  
- Property browsing  
- Property detail view  
- Property creation  
- Image uploads  
- Owner dashboard  
- Property search filters  
- Pagination  
- Favorites system  
- Messaging system  

The project now functions as a **complete full-stack property marketplace MVP**.

---

# Future Improvements

Possible improvements for future development:

- Real-time chat interface  
- Improved UI design  
- Property editing and management  
- Notification system  
- Combined property search filters  
- Admin moderation panel  
- Docker-based deployment  

---

# Author

**Omkar Kadam**  
BCA Student — Maharaja Sayajirao University (MSU), Vadodara
