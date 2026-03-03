# Execution Plan – Build Order

Development follows a backend-first approach to ensure stable APIs before frontend integration.

No frontend implementation begins until backend CRUD operations are verified.

---

## Phase 1 – Project Setup

### 1. Backend Initialization

- Create Spring Boot project  
- Add required dependencies:
  - Spring Web  
  - Spring Data JPA  
  - MySQL (or PostgreSQL) Driver  
  - Spring Security  
  - JWT library  
  - Lombok  

- Establish package structure:
  - config  
  - controller  
  - service  
  - repository  
  - entity  
  - dto  
  - security  

Backend must compile and start successfully.

---

### 2. Database Configuration

- Create cloud or local database instance  
- Configure connection in `application.properties`  
- Verify successful connection at application startup  
- Enable JPA auto table creation (development only)  

Application must start without runtime errors.

---

## Phase 2 – Domain Modeling

### 3. Entity Creation

Create JPA entities:

- User  
- Property  
- Message  
- Favorite  

Define:

- Fields  
- Relationships  
- Constraints  

Application must start with schema successfully generated.

---

### 4. Repository Layer

Create JPA repositories:

- UserRepository  
- PropertyRepository  
- MessageRepository  
- FavoriteRepository  

Ensure repository interfaces compile without errors.

---

## Phase 3 – Business Logic

### 5. Service Layer

Implement:

- AuthService  
- PropertyService  
- MessageService  
- FavoriteService  

Responsibilities:

- Core CRUD logic  
- Ownership validation  
- Business rule enforcement  

Controllers must not contain business logic.

---

### 6. Controller Layer

Expose REST endpoints:

#### Authentication
- POST `/auth/register`  
- POST `/auth/login`  

#### Property
- POST `/properties`  
- GET `/properties`  
- GET `/properties/{id}`  
- PUT `/properties/{id}`  
- DELETE `/properties/{id}`  

#### Message
- POST `/messages`  
- GET `/messages/received`  

#### Favorite
- POST `/favorites/{propertyId}`  
- DELETE `/favorites/{propertyId}`  
- GET `/favorites`  

---

## Phase 4 – Backend Validation

### 7. API Testing

Using Postman or similar tools:

- Register user  
- Login and obtain JWT  
- Test authenticated CRUD operations  
- Verify ownership restrictions  
- Confirm database persistence  

Backend is considered stable only when all endpoints function correctly.

---

## Phase 5 – Frontend Development

### 8. React Initialization

- Create React project  
- Configure routing  
- Create pages:
  - Login  
  - Register  
  - Property List  
  - Property Detail  
  - Create / Edit Property  
  - Favorites  
  - Messages  

Focus on functionality, not styling.

---

### 9. Frontend–Backend Integration

- Configure API base URL  
- Implement JWT storage  
- Protect routes  
- Integrate CRUD operations  
- Handle API errors properly  

Frontend must operate fully against the live backend.

---

## Phase 6 – Deployment

### 10. Backend Deployment

- Push to GitHub  
- Connect hosting provider  
- Configure environment variables  
- Verify public API access  

---

### 11. Frontend Deployment

- Push to GitHub  
- Deploy via Vercel or Netlify  
- Configure production API URL  
- Verify successful production requests  

---

## Completion Criteria

The project is complete when:

- Backend is deployed  
- Frontend is deployed  
- Database is online  
- Authentication works  
- CRUD operations work  
- Public URL is accessible  

---

## Guiding Principle

Do not build UI for any endpoint that has not been implemented and verified in the backend.