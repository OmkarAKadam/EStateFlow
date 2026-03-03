# System Architecture

## 1. Application Type

Web-based application following a Client–Server architecture.

The frontend and backend operate as independent applications communicating over HTTP.

---

## 2. Core Components

### Frontend
- React (Vite build tool)
- Tailwind CSS (UI styling)
- Communicates with backend via REST APIs

### Backend
- Spring Boot (REST API server)
- Handles authentication, authorization, and business logic
- Manages database interaction

### Database
- MySQL (primary)
- PostgreSQL (alternative option)

---

## 3. Project Structure

The system is divided into two independent projects:

- `estateflow-frontend`
- `estateflow-backend`

### Frontend Responsibilities
- UI rendering
- Form handling
- API integration
- Token storage and request authorization

### Backend Responsibilities
- Business logic execution
- Data validation
- Authentication and security
- Database persistence

---

## 4. Communication Model

- Protocol: HTTP  
- API Style: REST  
- Data Format: JSON  
- Base API Path: `/api/v1/...`  

The frontend consumes backend endpoints via structured API routes.

---

## 5. Authentication & Security

- Implemented in the backend using Spring Security  
- JWT (JSON Web Token) for stateless authentication  
- JWT included in the `Authorization` header as a Bearer token  
- Frontend stores token in memory or localStorage  

Role-based access control restricts endpoints based on user role (Owner / Tenant / Admin).

---

## 6. Backend Layered Architecture

The backend follows a standard layered architecture:

### Controller Layer
- Handles HTTP requests and responses  
- Delegates processing to service layer  
- Minimal business logic  

### Service Layer
- Contains core business logic  
- Handles validation and processing rules  
- Coordinates repository operations  

### Repository Layer
- Interacts with the database  
- Uses JPA for data persistence  
- Contains no business logic  

---

## Architectural Principle

The system prioritizes:

- Clear separation of concerns  
- Maintainability  
- Scalability within a monolithic structure  
- Clean, testable backend layering  