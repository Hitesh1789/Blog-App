# 📝 Blog App (Frontend)

A modern, secure, and scalable blog application frontend built with **React** and powered by **Appwrite** as the Backend-as-a-Service (BaaS).

## 🚀 Features

- 🔐 **Authentication** using Appwrite (login, signup, session handling)
- 👀 **Read all posts** (publicly visible to authenticated users)
- ✍️ **Create, Update, Delete** – logged-in users can manage their own posts
- 🧰 **Production-grade development practices**
  - Environment variables handling (`import.meta.env`)
  - Reusable UI components (e.g., Input, Select fields)
  - Common CSS via container pattern
  - `useRef` + `react-hook-form` for optimal form handling

## 🛠 Tech Stack

- **Frontend Framework:** React 19
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Styling:** Tailwind CSS
- **Rich Text Editor:** TinyMCE
- **Backend as a Service:** Appwrite
- **Form Handling:** React Hook Form
- **HTML Parser:** html-react-parser

## 📦 Dependencies

```json
{
  "@reduxjs/toolkit": "^2.8.2",
  "@tailwindcss/vite": "^4.1.11",
  "@tinymce/tinymce-react": "^6.2.1",
  "appwrite": "^18.1.1",
  "html-react-parser": "^5.2.5",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hook-form": "^7.58.1",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.6.2",
  "tailwindcss": "^4.1.11"
}
