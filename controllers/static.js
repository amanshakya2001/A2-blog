const Blog = require("../models/blog");
const User = require("../models/user");
const { formatTime } = require("../utils");
const Comment = require("../models/comment");

const home = async (req, res) => {
    const email = req.email;
    let blogs = await Blog.find({}).sort({ createdAt: -1 }).populate("author").lean();
    blogs = blogs.map(blog => {
        return {
            ...blog,
            createdAt: formatTime(blog.createdAt),
            updatedAt: formatTime(blog.updatedAt)
        }
    });
    res.render("homepage", { email, blogs });
};

const login = (req, res) => {
    res.render("login");
};

const register = (req, res) => {
    res.render("register");
};

const write = (req, res) => {
    const email = req.email;
    res.render("write", { email });
};

const blogDetail = async (req, res) => {
    const email = req.email;
    const blog = await Blog.findById(req.params.id).populate("author").lean();
    const comments = await Comment.find({ blog: req.params.id }).populate("author").lean();
    blog.comments = comments.map(comment => {
        return {
            ...comment,
            createdAt: formatTime(comment.createdAt)
        }
    });
    blog.createdAt = formatTime(blog.createdAt);
    blog.updatedAt = formatTime(blog.updatedAt);

    console.log(blog);

    res.render("blog-detail", { email, blog });
};

const profile = async (req, res) => {
    const user = await User.findById(req.id).lean();
    user.createdAt = formatTime(user.createdAt);
    let blogs = await Blog.find({ author: req.id }).populate("author").lean();
    blogs = blogs.map(blog => {
        return {
            ...blog,
            createdAt: formatTime(blog.createdAt),
            updatedAt: formatTime(blog.updatedAt)
        }
    });
    res.render("profile", { email: user.email, user, blogs });
};

module.exports = {
    home,
    login,
    register,
    write,
    blogDetail,
    profile
};