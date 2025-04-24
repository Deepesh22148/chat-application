import mongoose from "mongoose";

const recentSchema = mongoose.Schema({
    startingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
recentSchema.index({ startingUser: 1, recentUser: 1 }, { unique: true });

const recent = mongoose.models.recent || mongoose.model("Recent" , recentSchema);

export default recent;