# Deployment Plan and Production Readiness

## Principle

A project is considered complete only when it is accessible online.

Local development success is not sufficient.  
The system must be publicly available and fully functional in production.

---

## Hosting Strategy

### Backend Hosting

**Recommended Platforms**
- Render  
- Railway  
- Fly.io  

**Service Type**
- Spring Boot API server  
- Persistent Java runtime  

**Selection Criteria**
- Native support for Java applications  
- Git-based deployment  
- Affordable student-tier pricing  
- Managed infrastructure  

---

### Frontend Hosting

**Recommended Platforms**
- Vercel  
- Netlify  

**Service Type**
- Static React build  

**Selection Criteria**
- Optimized for frontend frameworks  
- Automatic CI/CD from Git repository  
- Free SSL and CDN support  

---

### Database Hosting

**Options**
- Neon (PostgreSQL)  
- Railway PostgreSQL  
- Supabase PostgreSQL  

**Selection Criteria**
- Managed cloud database  
- External connection string support  
- Production-ready persistence  

---

## Environment Variables

### Backend

- `DB_URL`  
- `DB_USERNAME`  
- `DB_PASSWORD`  
- `JWT_SECRET`  
- `FRONTEND_URL` (for CORS configuration)  

### Frontend

- `VITE_API_URL` (Vite)  
  or  
- `REACT_APP_API_URL` (Create React App)  

No credentials or secrets should be stored in source code.

---

## Deployment Process

### Backend Deployment

1. Push Spring Boot project to GitHub  
2. Connect repository to hosting platform  
3. Configure environment variables  
4. Build and deploy  
5. Verify public API endpoint  

---

### Frontend Deployment

1. Push React project to GitHub  
2. Connect repository to Vercel or Netlify  
3. Configure API base URL environment variable  
4. Build and deploy  
5. Verify frontend loads and communicates with backend  

---

## Deployment Validation Checklist

The system is correctly deployed if:

- Frontend loads from public URL  
- Backend API responds online  
- Database persists data  
- Authentication works in production  
- CRUD operations function in production  

If any feature works only locally, deployment is incomplete.

---

## Infrastructure Sanity Check

If deployment complexity exceeds development complexity, reconsider:

- Excess configuration  
- Hosting incompatibility  
- Unnecessary infrastructure  

The stack must match project scope and timeline.

---

## Completion Standard

A shareable live URL demonstrating full functionality is mandatory for project completion.