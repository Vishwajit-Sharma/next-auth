import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Pls provide user-name"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Pls provide password"],
    },
    email: {
        type: String,
        required: [true, "Pls provide email"],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, "Pls provide mobile no."],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User