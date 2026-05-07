# Learnova

A full-stack e-learning platform with role-based access control, JWT authentication, email verification, and a complete course management system for both students and instructors.

---

## Overview

Learnova is a production-oriented web application built to demonstrate full-stack engineering across the complete application layer — from database schema design and REST API architecture through to a responsive, themed frontend with a custom design system.

The platform supports two user roles with entirely separate workflows. Students browse, search, filter, and enroll in courses. Instructors create and manage their own courses, with ownership enforced at the database level. Every access control decision is verified in three independent places: the frontend route guard, the Express middleware, and the SQL query itself.

---

## Tech Stack

**Frontend**

- React 19 with Vite
- React Router v7
- Axios
- Custom CSS design system with dark and light mode

**Backend**

- Node.js with Express 5
- MySQL2
- JSON Web Tokens
- bcrypt
- Nodemailer with Gmail SMTP

**Database**

- MySQL with relational schema

---

## Features

**Authentication**

- JWT-based stateless authentication with 24-hour expiry
- Automatic session invalidation on token expiry — expired tokens are decoded client-side on load and cleared before any requests are made
- Email verification on signup using cryptographically random 32-byte hex tokens
- Passwords hashed with bcrypt at cost factor 10
- Resend verification flow for missed emails
- Blocked signin for unverified accounts at the API level

**Role-Based Access**

- Student and instructor roles enforced across frontend routes, Express middleware, and database queries
- Instructors can only view, edit, and delete courses they created — ownership is verified in the SQL query, not just the application layer
- Students cannot access instructor-only endpoints regardless of client-side manipulation

**Course System**

- Full course creation with title, description, category, difficulty, video URL, and preview URL
- YouTube URL detection covering all formats — standard watch links, shortened youtu.be, embed URLs, and Shorts — rendered as responsive embedded iframes
- Non-YouTube preview URLs fall back to image rendering
- Search and filter by category and difficulty level with URL query parameter support for direct linking to filtered views
- Student enrollment with duplicate enrollment prevention

**Dashboard**

- Student dashboard shows enrolled courses with progress indicators and profile management
- Instructor dashboard shows only their courses, course creation form, and per-course management
- Profile editing modal for username, email, gender, and optional password update

**Design**

- Custom CSS design system built on CSS custom properties
- Dark mode default with light mode toggle, switched at runtime without page reload
- Responsive layout down to 320px viewport with hamburger navigation on mobile
- Consistent component language across badges, cards, buttons, forms, and states

**Production Patterns**

- React ErrorBoundary for graceful component-level error handling
- Custom 404 page for unmatched routes
- Loading skeletons during data fetches
- Empty states with contextual actions
- CORS restricted to deployed frontend origin in production

---

## Project Structure

```
learnova/
├── backend/
│   ├── controllers/
│   │   ├── Authcontroller.js
│   │   ├── Coursecontroller.js
│   │   ├── Enrollmentcontroller.js
│   │   └── Usercontroller.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── role.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── Authroutes.js
│   │   ├── Courseroutes.js
│   │   ├── Enrollmentroutes.js
│   │   └── Userroutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── db.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CourseCard.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── VerifyEmail.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── index.html
└── README.md
```

---

## Getting Started

**Prerequisites**

- Node.js 18 or higher
- MySQL 8 or higher

**Backend setup**

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=learnova
DB_PORT=3306
JWT_SECRET=your_jwt_secret
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
PORT=5000
```

Run the database schema:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(50),
  role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  videourl VARCHAR(500),
  previewVideoUrl VARCHAR(500),
  instructor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id)
);

CREATE TABLE user_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  courseId INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (courseId) REFERENCES courses(id)
);
```

Start the backend:

```bash
npm run dev
```

**Frontend setup**

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The application runs at `http://localhost:5173`.

---

## Email Verification Setup

Gmail App Passwords are required for the email service. To generate one, enable two-factor authentication on your Google account, navigate to Security, search for App Passwords, and generate a password for Mail. Use that 16-character password as `EMAIL_PASS` in your backend `.env`.

---

## Deployment

The application is deployed using Railway for the backend and database, and Vercel for the frontend.

- Backend and MySQL: Railway
- Frontend: Vercel

Set all environment variables in the Railway and Vercel dashboards to match your production values. Update `CLIENT_URL` in Railway and `VITE_API_URL` in Vercel after both services are live.

Live demo: [link]

---

## Database Schema

```
users          — id, username, email, password, gender, role, is_verified, verification_token
courses        — id, title, description, category, difficulty, videourl, previewVideoUrl, instructor_id
user_courses   — id, userId, courseId, enrolled_at
```

---

## Known Limitations and Planned Improvements

- Progress tracking is currently simulated with random values. A proper lessons and completion tracking system is planned.
- Course ratings and reviews are not yet implemented.
- Video content is linked externally via URL. Native upload and storage via a service like Cloudinary is a planned improvement.
- Tests are not yet written. Unit and integration test coverage is a priority before the next major version.

---

## Author

Built by Tamilore — backend-leaning full-stack developer with a focus on clean architecture, real authentication patterns, and shipping things that actually work.

GitHub: github.com/Tamziycode
