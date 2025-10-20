const { Router } = require("express");  
const UserRouter = Router();
const { login, logout, signup } = require("../controllers/user");

UserRouter.post("/login", login);
UserRouter.post("/register", signup);
UserRouter.get("/logout", logout);

module.exports = UserRouter;
