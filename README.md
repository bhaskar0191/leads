Lead Management Application

A Full‑Stack MERN application for managing Leads with authentication, filtering, and CRUD operations.
Includes a Node.js + Express + MongoDB backend and a React + Vite + TailwindCSS frontend.

Features

🔐 Authentication: JWT login/logout with secure cookies.

🗂️ Lead Management: Create, Read, Update, Delete leads.

🔎 Filtering & Search: Filter by status, source, search query, and sort.

🎨 Frontend UI: Responsive TailwindCSS design with toast notifications.

⚙️ Backend API: RESTful endpoints with robust error handling.

Centralized MongoDB connection.

project-root/
 ┣ backend/
 ┃ ┣ src/
 ┃ ┃ ┣ config/DB.js
 ┃ ┃ ┣ middleware/auth.js
 ┃ ┃ ┣ models/Lead.js
 ┃ ┃ ┣ routes/LeadRoute.js
 ┃ ┃ ┣ controllers/leadController.js
 ┃ ┃ ┗ App.js
 ┃ ┣ package.json
 ┃ ┗ .env
 ┣ frontend/
 ┃ ┣ src/
 ┃ ┃ ┣ components/
 ┃ ┃ ┃ ┣ Login.jsx
 ┃ ┃ ┃ ┣ Register.jsx
 ┃ ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┃ ┣ AllLeads.jsx
 ┃ ┃ ┃ ┣ UpdateLeads.jsx
 ┃ ┃ ┃ ┗ Search.jsx
 ┃ ┃ ┣ pages/Homepage.jsx
 ┃ ┃ ┗ App.jsx
 ┃ ┣ package.json
 ┃ ┗ .env
 ┗ README.md


API Endpoints

Auth & Lead Management
Method	Endpoint	Description
POST	  /create	    Create a new lead (signup)
POST	  /login	    Login lead, returns JWT + cookie
GET	    /logout	    Logout lead (clear cookie)
GET	    /leads	    Get all leads
GET	    /leads/:id	Get lead by ID
PUT	    /leads/:id	Update lead
DELETE	/leads/:id	Delete lead
GET	    /filter	Filter leads by status, source, search

POST /create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123",
  "status": "new",
  "source": "website"
}

POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePass123"
}

GET /filter?status=new&source=website&search=john&sort=newest

Security Notes
Passwords are hashed using bcrypt before saving.

JWT tokens expire in 1 hour.

Cookies are set with httpOnly, secure, and sameSite options for safety.

Ensure JWT_SECRET is strong and never committed to source control.

Node.js (runtime)

Express.js (server framework)

MongoDB + Mongoose (database & ODM)

bcrypt (password hashing)

jsonwebtoken (auth tokens)

dotenv (environment variables)

cookie-parser (cookie handling)

cors (cross-origin requests)

Frontend: React, Vite, TailwindCSS, Axios, React Router.

Utilities: react-hot-toast, react-icons.

Future Improvements

Add role-based access control (RBAC).
Implement refresh tokens for longer sessions.
Add pagination for large lead datasets.
Integrate unit tests with Jest/Supertest.
Protected routes for authenticated users.
Global state management (Redux/Context).
Pagination for large datasets.
Refresh tokens for longer sessions.
Unit tests with Jest/Supertest.

Frontend Component Flow

App.jsx
Sets up React Router.

Routes to Homepage.
Homepage.jsx
Central hub with conditional rendering (activeComponent).

Components:

Register.jsx → Lead registration form.

Login.jsx → Login form.

AllLeads.jsx → Displays all leads.

UpdateLeads.jsx → Updates selected lead.

Search.jsx → Filters leads.

Navbar.jsx → Navigation + search + logout.