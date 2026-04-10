# A2 Blog

A full-stack blogging platform where users can create accounts, write blogs with cover images, and comment on posts.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Templating:** EJS
- **Auth:** JWT + Cookie-based sessions
- **File Uploads:** Multer
- **Security:** Crypto

## Features

- User registration and login
- Write, edit, and delete blog posts
- Upload cover images for blogs
- Comment on blog posts
- User profile pages
- Protected routes via auth middleware

## Project Structure

```
a2-blog-project/
├── controllers/       # Route handler logic (blog, comment, user)
├── models/            # Mongoose schemas (Blog, Comment, User)
├── routes/            # Express route definitions
├── middelwares/       # Auth middleware
├── utils/             # JWT helpers
├── views/             # EJS templates
├── public/            # Client-side scripts
├── index.js           # App entry point
└── connection.js      # MongoDB connection
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

### Run

```bash
node index.js
```

App runs on [http://localhost:8000](http://localhost:8000)
