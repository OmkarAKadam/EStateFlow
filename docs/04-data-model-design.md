# Data Model Design (MVP-Oriented)

The core system consists of four main entities:

- User
- Property
- Message
- Favorite

Only MVP-surviving entities are modeled. No reporting, moderation, audit trails, or fantasy enterprise features.

---

# 1. User

## Fields

### Required
- id
- fullName
- email
- password
- role (OWNER / TENANT / ADMIN)

### Optional
- phoneNumber
- profilePhoto
- bio

### System Fields
- createdAt
- updatedAt

---

## Relationships

- One User → Many Properties
- One User → Many Messages (sent)
- One User → Many Messages (received)
- One User → Many Favorites

### Relationship Summary

- User → Property = One-to-Many
- User → Message = One-to-Many
- User → Favorite = One-to-Many

---

## Deletion Strategy (MVP)

For MVP:
- Hard delete is acceptable.
- Deleting a User removes:
  - Their properties
  - Their messages
  - Their favorites

---

# 2. Property

## Fields

### Required
- id
- title
- description
- price
- location
- ownerId

### Optional
- propertyType (ROOM / FLAT / HOUSE)
- bedrooms
- bathrooms
- images

### System Fields
- createdAt
- updatedAt

---

## Relationships

- One Property → One Owner (User)
- One Property → Many Messages
- One Property → Many Favorites

### Relationship Summary

- User → Property = One-to-Many
- Property → Message = One-to-Many
- Property → Favorite = One-to-Many

---

## Deletion Strategy

If a Property is deleted:
- Delete related Favorites
- Delete related Messages

---

# 3. Message

## Fields

### Required
- id
- senderId
- receiverId
- propertyId
- content

### Optional
- isRead

### System Fields
- createdAt
- updatedAt

---

## Relationships

- One User → Many Messages (sent)
- One User → Many Messages (received)
- One Property → Many Messages

---

## Deletion Strategy

For MVP:
- If a User is deleted → delete their messages
- If a Property is deleted → delete related messages

---

# 4. Favorite

## Fields

### Required
- id
- userId
- propertyId

### Optional
- createdAt (useful for "recently saved")

---

## Relationships

- One User → Many Favorites
- One Property → Many Favorites

User ↔ Property = Many-to-Many (through Favorite)