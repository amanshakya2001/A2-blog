const { Router } = require("express");
const CommentRouter = Router();
const { createComment, getAllComments, getComment, updateComment, deleteComment } = require("../controllers/comment");

CommentRouter.get("/", getAllComments);
CommentRouter.get("/:id", getComment);
CommentRouter.post("/", createComment);
CommentRouter.put("/:id", updateComment);
CommentRouter.delete("/:id", deleteComment);

module.exports = CommentRouter;