const { Router } = require("express");
const BlogRouter = Router();
const { createBlog, updateBlog, deleteBlog, getBlog, getAllBlogs } = require("../controllers/blog");
const upload = require("../custom-multer");

BlogRouter.get("/", getAllBlogs);
BlogRouter.get("/:id", getBlog);
BlogRouter.post("/", upload.single("coverImage"), createBlog);
BlogRouter.put("/:id", updateBlog);
BlogRouter.delete("/:id", deleteBlog);


module.exports = BlogRouter;