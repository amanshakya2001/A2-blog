// nodejs imports
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();


// custom imports
const StaticRouter = require("./routes/static");
const UserRouter = require("./routes/auth");
const { authMiddleware } = require("./middelwares/auth");
const connectDB = require("./connection");
const BlogRouter = require("./routes/blog");
const CommentRouter = require("./routes/comment");

// connect to database
connectDB();

// template engine
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware());
app.use(express.static("public"));

// routes
app.use("/", StaticRouter);
app.use("/api/auth", UserRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/comment", CommentRouter);

// server
app.listen(8000, () => {
    console.log("Server started on port 8000");
});