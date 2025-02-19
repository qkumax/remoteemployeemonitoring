 import mongoose from "mongoose";

 const Userschema = new mongoose.Schema({
    fullName: {
        type:String,
        required: true,
    },

    email: {
        type:String,
        required: true,
        unique: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },

    avatarURl: String,

    role: { 
        type: String, 
        enum: ["employee", "admin"], 
        default: "employee" 
    },
},
{
timestaps:true,
},
);

export default mongoose.model('User', Userschema);
