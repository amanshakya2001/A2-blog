const { Router } = require("express");  
const StaticRouter = Router();
const { alreadyLoggedIn, requiredLogin } = require("../middelwares/auth");
const { home, login, register, write, blogDetail, profile } = require("../controllers/static");
    
StaticRouter.get("/", home);
StaticRouter.get("/login", alreadyLoggedIn(), login);
StaticRouter.get("/register", alreadyLoggedIn(), register);
StaticRouter.get("/write", requiredLogin() ,write);
StaticRouter.get("/blog/:id", blogDetail);
StaticRouter.get("/profile", requiredLogin(), profile);

module.exports = StaticRouter;
