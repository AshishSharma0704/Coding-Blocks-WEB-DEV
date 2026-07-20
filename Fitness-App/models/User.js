const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    goal: {
        type: String,
        enum: [
            "Weight Loss",
            "Muscle Gain",
            "Maintain Fitness",
            "Endurance",
            "General Health"
        ],
        default: "General Health"
    },

    bio: {
        type: String,
        default: ""
    },

    points: {
        type: Number,
        default: 0
    },

    streak: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);