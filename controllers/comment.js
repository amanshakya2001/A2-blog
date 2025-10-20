const Comment = require("../models/comment");

const createComment = async (req, res) => {
    const { content, blogId } = req.body;  
    if (!content) {
        return res.status(400).json({ success: false, error: "Content is required" });
    }
    if (!blogId) {
        return res.status(400).json({ success: false, error: "Blog ID is required" });
    }
    const author = req.id;    
    try {
        const comment = await Comment.create({ content, author, blog: blogId });
        res.json({ comment, success: true, message: "Comment created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Failed to create comment" });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.json({ comments, success: true, message: "All comments fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch comments" });
    }
};

const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.json({ comment, success: true, message: "Comment fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch comment" });
    }
};      

const updateComment = async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
    const comment = await Comment.findById(id).populate("author").lean();
    if(req.id != comment.author._id){
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    if (!content) {
        return res.status(400).json({ success: false, error: "Content is required" });
    }
    try {
        const comment = await Comment.findByIdAndUpdate(id, { content });
        res.json({ comment, success: true, message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update comment" });
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate("author").lean();
    if(req.id != comment.author._id){
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    try {
        const comment = await Comment.findByIdAndDelete(id);
        res.json({ comment, success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete comment" });
    }
};

module.exports = {
    createComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment
};
