const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const mongoose = require("mongoose");
const Challenge = require("../models/Challenge");

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI);

async function seed() {

    await Challenge.deleteMany();

    await Challenge.insertMany([

    {
        title: "30-Day Push-up Challenge",
        description: "Complete push-ups every day for 30 days.",
        category: "Strength",
        duration: 30,
        target: 300,
        points: 500,
        difficulty: "Medium"
    },

    {
        title: "100 Squats Challenge",
        description: "Perform 100 squats every day for 21 days.",
        category: "Strength",
        duration: 21,
        target: 2100,
        points: 450,
        difficulty: "Medium"
    },

    {
        title: "10K Running Challenge",
        description: "Run a total of 10 kilometers.",
        category: "Cardio",
        duration: 14,
        target: 10,
        points: 300,
        difficulty: "Easy"
    },

    {
        title: "50KM Cycling Challenge",
        description: "Complete 50 kilometers of cycling.",
        category: "Cardio",
        duration: 30,
        target: 50,
        points: 550,
        difficulty: "Medium"
    },

    {
        title: "Daily Yoga Flow",
        description: "Practice yoga for at least 20 minutes every day.",
        category: "Yoga",
        duration: 30,
        target: 30,
        points: 350,
        difficulty: "Easy"
    },

    {
        title: "HIIT Blast",
        description: "Complete 15 high-intensity interval training sessions.",
        category: "Cardio",
        duration: 30,
        target: 15,
        points: 600,
        difficulty: "Hard"
    },

    {
        title: "Muscle Gain Program",
        description: "Complete 25 strength workouts this month.",
        category: "Strength",
        duration: 30,
        target: 25,
        points: 700,
        difficulty: "Hard"
    },

    {
        title: "Weight Loss Sprint",
        description: "Complete 20 cardio workouts in 30 days.",
        category: "Weight Loss",
        duration: 30,
        target: 20,
        points: 650,
        difficulty: "Hard"
    },

    {
        title: "Morning Walk Challenge",
        description: "Walk 5,000 steps every morning.",
        category: "General",
        duration: 21,
        target: 21,
        points: 250,
        difficulty: "Easy"
    },

    {
        title: "Hydration Challenge",
        description: "Drink at least 2 liters of water every day.",
        category: "General",
        duration: 30,
        target: 30,
        points: 200,
        difficulty: "Easy"
    },

    {
        title: "Plank Master",
        description: "Hold a plank for a cumulative 30 minutes.",
        category: "Strength",
        duration: 14,
        target: 30,
        points: 400,
        difficulty: "Medium"
    },

    {
        title: "Endurance Builder",
        description: "Complete 12 endurance workouts.",
        category: "Endurance",
        duration: 30,
        target: 12,
        points: 600,
        difficulty: "Hard"
    },

    {
        title: "Stretch Every Day",
        description: "Stretch for 15 minutes daily.",
        category: "Yoga",
        duration: 30,
        target: 30,
        points: 250,
        difficulty: "Easy"
    },

    {
        title: "Weekend Warrior",
        description: "Complete a workout every weekend.",
        category: "General",
        duration: 8,
        target: 8,
        points: 300,
        difficulty: "Easy"
    },

    {
        title: "Calories Crusher",
        description: "Burn 10,000 calories through workouts.",
        category: "Weight Loss",
        duration: 45,
        target: 10000,
        points: 1000,
        difficulty: "Hard"
    }

]);

    console.log("Challenges seeded");

    process.exit();
}

seed();