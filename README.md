# Blog Platform

A full-stack blog platform built with Node.js, Express, MongoDB, and EJS — featuring JWT authentication, blog management, image uploads, and comments.

## Features

- User signup and login with JWT (stored in cookies) and bcrypt password hashing
- Create, read, update, and delete blog posts
- Cover image upload via Multer
- Per-blog comment system with author-only edit/delete
- User profile page with all authored blogs
- Server-side rendered UI with EJS templates

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT, bcrypt
- **Templating:** EJS
- **File Upload:** Multer
- **Dev:** Nodemon

## Getting Started

### Prerequisites

- Node.js >= 14
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/amanshakya2001/blog-platform-project.git
cd blog-platform-project
npm install
```

### Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Running

```bash
npm start
```

Visit `http://localhost:3000`

## Project Structure

```
├── controllers/     # Route logic
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── views/           # EJS templates
├── public/
│   └── media/       # Uploaded images
└── index.js
```

## License

MIT
