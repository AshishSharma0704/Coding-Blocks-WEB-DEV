const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "Strength",
            "Cardio",
            "Weight Loss",
            "Endurance",
            "Yoga",
            "General"
        ],
        default: "General"
    },

    duration: {
        type: Number,
        required: true
    },

    target: {
        type: Number,
        required: true
    },

    points: {
        type: Number,
        default: 100
    },

    difficulty: {
        type: String,
        enum: [
            "Easy",
            "Medium",
            "Hard"
        ],
        default: "Easy"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Challenge", challengeSchema);