# Multi-User Todo App (Admin + User)

A simple MERN Stack Todo Application with role-based access control for **Admin** and **User**.  
This app includes login, register, todo creation, and listing with separate functionalities for admin and user.

---



---

## 🔑 Default Credentials

### 👮‍♂️ Admin Login
- **Email:** `admin@e.com`  
- **Password:** `123`

### 👥 User Logins
| Name   | Email             | Password |
|--------|------------------|----------|
| Rohan  | rohan@gmail.com  | 123      |
| Komal  | komal@gmail.com  | 123      |

---

## 📌 Features

### 🔐 Authentication
- Login & Register functionality
- Switch between Admin and User login forms using buttons/links

### 👮‍♂️ Admin Panel
- Add a todo with **user's email** (assign todo to user)
- View **all registered users**
- View **all todos (of all users)**
- Admin APIs:
  - `POST /api/admin/addtodo` – Add todo for a user
  - `GET /api/admin/users` – Get all users
  - `GET /api/admin/alltodos` – Get all todos

### 🙋‍♂️ User Panel
- View only **their own todos**
- Create a new todo for themselves
- User APIs:
  - `POST /api/user/addtodo` – Add own todo
  - `GET /api/user/mytodos?email=user@example.com` – Get own todos

---

## 🏠 Home Page

- Two options:  
  `Admin Login` | `User Login`
  
- At the bottom of each login section:
  - **Switch links** between Login ↔ Register

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS (or Bootstrap)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT for secure login sessions

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name





cd backend
npm install
npm run dev



cd frontend
npm install
npm run dev


