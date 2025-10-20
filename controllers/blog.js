const Blog = require("../models/blog");

const createBlog = async (req, res) => {
    const { title, content } = req.body;
    const coverImage = req.file;
    const userId = req.id;  
    if (!title) {
        return res.status(400).json({ success: false, error: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ success: false, error: "Content is required" });
    }
    if (!coverImage) {
        return res.status(400).json({ success: false, error: "Cover image is required" });
    }
    let coverImagePath = `http://localhost:8000/media/${coverImage.filename}`;
    
    try {
        const blog = await Blog.create({ title, content, user: userId, coverImage: coverImagePath, author: userId });
        res.json({ blog, success: true, message: "Blog created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to create blog" });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json({ blogs, success: true, message: "All blogs fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch blogs" });
    }
};

const getBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        res.json({ blog, success: true, message: "Blog fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch blog" });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(id, { title, content });
        res.json({ blog, success: true, message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update blog" });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        res.json({ blog, success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete blog" });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog
};