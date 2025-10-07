# 🍳 Recipe Book website (Cooksy) - Server

Welcome to the **server-side** of the Recipe Book App! This Express.js and MongoDB-powered backend handles user-authenticated recipe storage, updating, deleting, and liking functionalities for food lovers all around the world. 🔥

---
___

## 🚀 Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web application framework
- **MongoDB** – NoSQL database
- **Cors** – To handle cross-origin requests
- **Dotenv** – For managing environment variables
- **Nodemon** – Auto-restarts server on code changes (for development)

---
___

## 📦 Features

- 🍝 **Add, update, and delete your own recipes**
- 🧾 **Fetch top 6 liked recipes**
- ❤️ **Like others' recipes (except your own!)**
- 🔍 **Filter recipes by Cuisine type**
- 🗃️ **User-specific data access and protection**
- 📤 **Fully connected to a frontend hosted separately**

___
___

## 🌍 Live Server Link

> 🔗 [Live Server on Vercel](https://recipe-book-server-kappa.vercel.app/)

---
---


📁 Folder Structure
├── .env
├── .gitignore
├── .vercel/
│   └── project.json
├── node_modules/
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── README.text
├── recipes.json
└── vercel.json
 

___
___


## 🔐 Environment Variables

Create a `.env` file in the root of the project and add your credentials:

```env
PORT=3000
MONGODB_URI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1etiuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

___
___


💻 Setup Instructions
1. Clone the repo:
git clone https://github.com/Programming-Hero-Web-Course4/b11a10-server-side-for-Sifad99

2. Install dependencies:
npm install

3. Run the server:
nodemon index.js

____
____

👨‍💻 Server-side Commits
✅ Minimum of 8 meaningful commits added in the server repository.

---_
