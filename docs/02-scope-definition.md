# Scope Definition – MVP

## 1. Core System Purpose

The platform must enable the following core flow:

- An Owner can list a property  
- A Tenant can browse and filter listings  
- A Tenant can contact the Owner  

If these three capabilities do not function reliably, the system fails its primary objective.

---

## 2. Minimum Viable Product (MVP) Features

These features are mandatory for project completion.

### Authentication

- User registration  
- User login  
- Role selection (Owner / Tenant)  
- Role-based access control  

---

### Property Management (CRUD)

Owners can:

- Create a property listing  
- Edit a property listing  
- Delete a property listing  
- Upload property images (minimum 1–3 images)

---

### Property Listing & Filtering

Users can:

- View all property listings  
- Filter by:
  - Price range  
  - Area  
  - Property type (Room | Flat | House)

Filtering should be functional and efficient, not decorative.

---

### Property Details Page

Each property must display:

- Full description  
- Uploaded images  
- Owner contact information  

This page validates end-to-end system integration.

---

### Deployment Requirements

- Live frontend URL  
- Live backend API  
- Connected production database  
- Fully functional public demo  

Localhost-only demonstrations are not acceptable.

---

## 3. Optional Enhancements (Post-MVP)

These features improve usability but are not required for internship-level completion:

- Property favorites / wishlist  
- Pagination  
- Sorting (e.g., price low to high)  
- Basic search bar  
- Email verification  
- Basic admin panel  
- Map integration  
- Image carousel  
- Real-time chat  

These may be added only after the MVP is stable.

---

## 4. Out of Scope (Avoid During MVP)

The following features increase complexity without adding proportional value at this stage:

- AI-based recommendations  
- Payment gateway integration  
- Subscription models  
- Rating and review systems  
- Advanced analytics dashboards  
- Microservices architecture  
- Kubernetes deployment  

The focus remains on a stable, complete, and deployable monolithic application.

---

## 5. Compressed Timeline Version (7-Day Constraint)

If development time is severely limited, the minimum acceptable delivery includes:

- Owner can add, edit, and delete properties  
- Tenant can view property listings  
- Tenant can contact Owner  
- Role-based authentication  
- Functional filtering (price, area, type)  
- Deployed frontend and backend  
- Connected production database  

The system must demonstrate complete request-response integration from UI to database.