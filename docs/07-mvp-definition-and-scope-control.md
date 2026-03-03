# MVP Definition and Scope Control

## Objective

The purpose of the Minimum Viable Product (MVP) is functional validation.

The system must reliably support its core workflows.  
Visual polish, scale, and advanced capabilities are not part of MVP.

If the system functions correctly without a feature, that feature is not considered MVP.

---

## Excluded from MVP

The following are intentionally excluded to prevent scope creep:

- Advanced UI design or visual polish  
- Animations or transitions  
- AI-based recommendations  
- Advanced search logic  
- Email, push, or in-app notifications  
- Real-time messaging (WebSockets)  
- Image moderation workflows  
- Complex admin dashboards  
- Performance optimization  
- Advanced role hierarchy  

These features do not affect the core operational flow of the system.

---

## Required for MVP

### 1. Authentication

Users must be able to:

- Register  
- Login  
- Remain authenticated using JWT  
- Access protected endpoints  

Role-based access control must function correctly.

---

### 2. Core CRUD Functionality

#### Property

- Owner can create property  
- Owner can edit property  
- Owner can delete property  
- Users can view property list  
- Users can view property details  

#### Message

- User can send a message to property owner  
- Owner can view received messages  

#### Favorite

- User can save a property  
- User can remove a saved property  
- User can view saved properties  

---

### 3. Basic Validation

- Required fields enforced  
- Email format validation  
- Minimum password length  
- Prevent empty submissions  

Advanced validation logic is not required.

---

### 4. Basic User Interface

- Functional layout  
- Usable forms  
- Readable lists  
- Working navigation  

No design system or visual refinement is required.

---

### 5. Deployment

The system must be publicly accessible and functional:

- Frontend deployed  
- Backend deployed  
- Production database connected  
- Authentication working in production  

If external users can complete the core flows, the MVP is considered complete.

---

## MVP Pass Criteria

The MVP is successful if a user can:

1. Register  
2. Login  
3. View property listings  
4. Contact property owner  
5. Save a property  
6. Owner can manage listings  

---

## MVP Failure Indicators

The project leaves MVP scope if development effort is spent on:

- UI refinement before CRUD completion  
- Advanced filtering before messaging works  
- Animations before authentication is stable  
- AI features before deployment  

---

## Guiding Principle

Functionality has priority over visual presentation.

A deployed, fully functional system meets MVP standards.  
A visually polished but incomplete system does not.