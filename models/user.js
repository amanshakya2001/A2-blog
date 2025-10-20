const { model, Schema } = require("mongoose");
const { hashPassword } = require("../utils/auth");

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
},{ timestamps: true });

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        const { salt, hash } = hashPassword(this.password);
        this.salt = salt;
        this.password = hash;
    }
    next();
});

const User = model("User", userSchema);

module.exports = User;
