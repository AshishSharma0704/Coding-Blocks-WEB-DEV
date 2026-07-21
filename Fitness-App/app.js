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
app.use((req, res, next) => {

    res.locals.user = req.session.user || null;

    next();

});

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

// Authentication Routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
// Workouts
const workoutRoutes = require("./routes/workout");
app.use("/", workoutRoutes);

// Challenges
const challengeRoutes = require("./routes/challenge");

app.use(challengeRoutes);



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