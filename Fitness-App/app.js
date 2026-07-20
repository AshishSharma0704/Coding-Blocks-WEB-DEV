const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 3000;

// ================= DATABASE =================

connectDB();

// ================= MIDDLEWARE =================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ================= VIEW ENGINE =================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= ROUTES =================

// Home Page
app.get("/", (req, res) => {
    res.render("index");
});
app.use(
    session({
        secret: process.env.JWT_SECRET || "fitnessSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }
    })
);
// Authentication Routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
// Workouts
const workoutRoutes = require("./routes/workout");
app.use("/", workoutRoutes);

// Challenges
app.get("/challenges", (req, res) => {

    const challenges = [
        {
            _id: 1,
            title: "30-Day Push-Up Challenge",
            description: "Complete push-ups every day.",
            goal: "100 Push-ups Daily",
            startDate: "2026-07-20",
            endDate: "2026-08-20",
            participants: 45
        },
        {
            _id: 2,
            title: "10K Steps Challenge",
            description: "Walk 10,000 steps daily.",
            goal: "10,000 Steps",
            startDate: "2026-07-22",
            endDate: "2026-08-22",
            participants: 68
        },
        {
            _id: 3,
            title: "Weight Loss Challenge",
            description: "Lose weight through consistent workouts.",
            goal: "Lose 5 kg",
            startDate: "2026-07-25",
            endDate: "2026-09-01",
            participants: 31
        }
    ];

    res.render("challenges", { challenges });
});

// Leaderboard
app.get("/leaderboard", (req, res) => {

    const leaderboard = [
        {
            name: "Rahul",
            points: 980,
            streak: 45,
            workouts: 180
        },
        {
            name: "Priya",
            points: 910,
            streak: 38,
            workouts: 165
        },
        {
            name: "Ashish",
            points: 860,
            streak: 32,
            workouts: 150
        },
        {
            name: "Amit",
            points: 790,
            streak: 29,
            workouts: 140
        },
        {
            name: "Sneha",
            points: 720,
            streak: 25,
            workouts: 128
        }
    ];

    res.render("leaderboard", { leaderboard });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});