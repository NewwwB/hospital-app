# Hospital App

A comprehensive hospital management system built with modern web technologies. This full-stack application streamlines hospital operations by providing robust user authentication, patient management, and role-based access control.

## 🚀 Tech Stack

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **React Router** - For client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Express** - Fast, unopinionated web framework for Node.js
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Advanced open-source relational database
- **JWT** - For secure authentication
- **bcrypt** - For password hashing

## ✨ Core Features

### User Management
- Secure authentication system with JWT
- Role-based access control (Admin, Doctor, Nurse, Staff)
- Password encryption using bcrypt
- User profile management

### Patient Management
- Complete patient CRUD operations
- Patient medical history tracking
- Appointment scheduling
- Digital medical records
- Search and filter capabilities

### Security
- Password hashing
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Session management

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn package manager
- PostgreSQL (if not using Docker)

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NewwwB/hospital-app.git
   cd hospital-app
   ```


2. **Using Docker (Recommended)**
   ```bash
   # Start all services
   docker compose up -d 
   ```

3. **Manual Setup (Alternative)**
   ```bash
   # Install dependencies in backend and frontend
   npm install

   # Setup database in backend
   npx prisma migrate dev
   npx prisma generate

   # Start development servers
   npm run dev
   ```



## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Patient Endpoints
- `GET /api/patients` - List all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

