# 🍽️ WildCookBook

**WildCookBook** is a modern recipe-sharing web application built using **React**, **Material UI**, and **JSON Server**. It allows users to explore, add, and manage recipes, save favorites, and securely log in and sign up using a simple authentication system.

---

## 🚀 Features

- 🔐 User authentication (Login & Signup)
- 🍲 Browse and view recipes
- ❤️ Save recipes to favorites
- 🛠️ Manage (Add/Edit/Delete) recipes
- 🌐 Responsive UI with Material UI
- 💾 Mock backend with JSON Server

---

## 🛠️ Tech Stack

- **React.js** – Frontend framework
- **React Router** – Page routing
- **Material UI (MUI)** – UI components
- **Font Awesome** – Icons
- **JSON Server** – Mock backend for users and recipes

---

## ✅ Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [JSON Server](https://www.npmjs.com/package/json-server)

---

## ✅ All Steps

1. Clone the Repository
2. Install Dependencies
3. Install JSON Server Globally (If not already installed)
4. Start the JSON Server
- Make sure you're in the project root (where db.json is located), then run:
- In your package.jon, place this under "scripts" - "server": "json-server --port 8000 --watch db.json --host 127.0.0.1",
5. Start the React App

---

## ✅ Login & Signup Instructions

1. Go to the Login or Signup page in the app.
2. To Sign Up:
- Click on Sign Up.
- Enter a unique username and password.
- Submit to create your account.
3. To Log In:
- Enter your registered username and password.
- You’ll be redirected to the homepage on success.
5. All login data is saved in db.json under the users array.

---

## 📥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kasun-Sanjeewa/recipe-sharing-application.git
cd wildcookbook
npm install
npm install -g json-server


