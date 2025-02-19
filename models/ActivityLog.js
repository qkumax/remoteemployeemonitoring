import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, default: Date.now }, 
    endTime: { type: Date }, 
    keyboardActivity: { type: Number, default: 0 }, 
    mouseActivity: { type: Number, default: 0 }, 
    usedApps: [{ name: String, duration: Number }], 
    screenshots: [{ url: String, timestamp: Date }] 
});

const ActivityLog = mongoose.model("ActivityLog", ActivitySchema);

export default ActivityLog;
