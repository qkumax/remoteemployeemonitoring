import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    position: {
        type: String,
    },
    avatarURL: String,
    role: { 
        type: String, 
        enum: ["employee", "admin"], 
        default: "employee" 
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true, // исправлено
});

export default mongoose.model('User', UserSchema);
