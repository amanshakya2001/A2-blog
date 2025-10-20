const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const jwtSecret = process.env.JWT_SECRET || "secret";

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256").update(password + salt).digest("hex");
    return { salt, hash };
};

const comparePassword = (password, hash, salt) => {
    const hash2 = crypto.createHash("sha256").update(password + salt).digest("hex");
    return hash === hash2;
};

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword,
};


