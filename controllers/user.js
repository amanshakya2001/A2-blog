const User = require("../models/user");
const { generateToken, comparePassword } = require("../utils/auth");

const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.create({ fullname, email, password });
    const token = generateToken({ id: user._id, role: user.role,email: user.email });
    res.cookie("token", token);
    res.json({ success: true, message: "User signed up successfully" });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }
    const isPasswordValid = comparePassword(password, user.password, user.salt);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
    }
    const token = generateToken({ id: user._id, role: user.role,email: user.email });
    res.cookie("token", token);
    res.json({ success: true, message: "User logged in successfully" });
};  

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while logging out" });
    }
};

module.exports = { 
    signup,
    login,
    logout
};