# Tech Stack Decision

## Selected Stack

**Backend:** Spring Boot  
**Frontend:** React  
**Database:** MySQL (primary)  
**API Communication:** REST (JSON)  
**Authentication:** JWT  

---

## Rationale

### 1. Skill Alignment

The stack aligns with existing knowledge in:

- Java  
- Spring Boot (REST APIs, JPA)  
- React  
- API integration  

This reduces learning overhead and ensures focused execution within the project timeline.

---

### 2. Industry Relevance

Spring Boot is widely adopted in enterprise backend systems.  
React is a dominant frontend library in modern web applications.

This combination demonstrates:

- Structured backend architecture  
- API-driven frontend development  
- Full-stack integration capability  

---

### 3. Portfolio and Resume Value

The stack signals:

- Backend competence in Java ecosystem  
- Understanding of layered architecture (Controller, Service, Repository)  
- Modern frontend development practices  
- Practical full-stack system design  

This is aligned with internship and entry-level software engineering expectations.

---

## Tradeoffs

Compared to MERN, this stack introduces additional complexity:

- Spring configuration overhead  
- Security setup (JWT)  
- DTO–Entity separation  
- More structured deployment process  

The slower development speed is accepted in exchange for stronger backend credibility and architectural discipline.

---

## Deployment Architecture (Planned)

- Spring Boot backend running as API server  
- React frontend as client application  
- MySQL database  
- JWT-based authentication  
- REST communication between client and server  

---

## Rejected Alternatives

### MERN Stack

**Advantages**
- Faster CRUD development  
- Simpler initial deployment  

**Reason Not Selected**
- Does not strengthen Java backend profile  

---

### Experimental or New Technologies (e.g., Go, Rust)

**Reason Not Selected**
- Increased learning overhead  
- Higher delivery risk within project timeline  
- Not aligned with current skill focus  

---

## Final Decision

Spring Boot + React provides an effective balance between:

- Skill alignment  
- Professional relevance  
- Architectural discipline  
- Portfolio strength  

The priority for this project is structured execution and completion over experimentation.