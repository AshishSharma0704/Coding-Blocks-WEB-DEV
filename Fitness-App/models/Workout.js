const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
{
    // Owner of the workout
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Exercise Name
    exercise: {
        type: String,
        required: true,
        trim: true
    },

    // Workout Category
    category: {
        type: String,
        enum: [
            "Strength",
            "Cardio",
            "Yoga",
            "HIIT",
            "Cycling",
            "Running",
            "Swimming",
            "CrossFit",
            "Stretching",
            "Other"
        ],
        default: "Other"
    },

    // Number of Sets
    sets: {
        type: Number,
        default: 0,
        min: 0
    },

    // Repetitions per Set
    reps: {
        type: Number,
        default: 0,
        min: 0
    },

    // Weight Lifted (kg)
    weight: {
        type: Number,
        default: 0,
        min: 0
    },

    // Workout Duration (minutes)
    duration: {
        type: Number,
        required: true,
        min: 1
    },

    // Calories Burned
    caloriesBurned: {
        type: Number,
        required: true,
        min: 0
    },

    // Optional Distance (km)
    distance: {
        type: Number,
        default: 0,
        min: 0
    },

    // Workout Notes
    notes: {
        type: String,
        trim: true,
        default: ""
    },

    // Workout Date
    workoutDate: {
        type: Date,
        default: Date.now
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Workout", workoutSchema);