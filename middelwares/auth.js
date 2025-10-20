const { verifyToken } = require("../utils/auth");

const authMiddleware = () => {
    return (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            req.email = null;
            req.id = null;
            req.role = null;
            return next();
        }
        try {
            const user = verifyToken(token);
            req.email = user.email;
            req.id = user.id;
            req.role = user.role;
            return next();
        } catch (error) {
            req.email = null;
            req.id = null;
            req.role = null;
            return next();
        }
    };
};

const alreadyLoggedIn = () => {
    return (req, res, next) => {
        const email = req.email;
        if (email) {
            return res.redirect("/");
        }
        return next();
    };
};

const requiredLogin = () => {
    return (req, res, next) => {
        const email = req.email;
        if (!email) {
            return res.redirect("/login");
        }
        return next();
    };
};

const checkPermission = (role) => {
    return (req, res, next) => {
        const userRole = req.role;
        if (!role.includes(userRole)) {
            return res.status(401).json({
                success: false,
                error: "You are not authorized to access this resource"
            });
        }
        return next();
    };
};

module.exports = { 
    authMiddleware,
    alreadyLoggedIn,
    requiredLogin,
    checkPermission
};

    