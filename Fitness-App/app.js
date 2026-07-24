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
const leaderboardRoutes = require("./routes/leaderboard");

app.use(leaderboardRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});