const mongoose = require("mongoose");

const userChallengeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true
    },

    progress: {
        type: Number,
        default: 0
    },

    completed: {
        type: Boolean,
        default: false
    },

    joinedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("UserChallenge", userChallengeSchema);