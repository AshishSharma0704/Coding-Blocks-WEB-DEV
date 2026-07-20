const User = require("../models/User");
const Workout = require("../models/Workout");

exports.getDashboard = async (req, res) => {
    try {

        const user = await User.findById(req.session.user.id);

        // Fetch all workouts of the logged-in user
        const workouts = await Workout.find({
            user: req.session.user.id
        }).sort({ workoutDate: -1 });

        // Statistics
        const totalWorkouts = workouts.length;

        const totalCalories = workouts.reduce(
            (sum, workout) => sum + workout.caloriesBurned,
            0
        );

        const totalDuration = workouts.reduce(
            (sum, workout) => sum + workout.duration,
            0
        );

        // Show only the latest 5 workouts
        const recentWorkouts = workouts.slice(0, 5);
        const progressPercentage = Math.min(
            Math.round((totalWorkouts / 7) * 100),
            100
        );

        res.render("dashboard", {
            user,
            totalWorkouts,
            totalCalories,
            totalDuration,
            recentWorkouts,
            progressPercentage
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Server Error");

    }
};
exports.getEditProfile = async (req, res) => {

    try {

        const user = await User.findById(req.session.user.id);

        if (!user) {
            return res.redirect("/login");
        }

        res.render("editProfile", {
            user
        });

    } catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};
exports.postEditProfile = async (req, res) => {

    try {

        const {
            name,
            age,
            height,
            weight,
            goal,
            bio
        } = req.body;

        const user = await User.findByIdAndUpdate(

            req.session.user.id,

            {
                name,
                age,
                height,
                weight,
                goal,
                bio
            },

            {
                returnDocument: "after",
                runValidators: true
            }

        );

        if (!user) {

            return res.redirect("/login");

        }

        // Update session so the navbar/dashboard immediately shows the new name
        req.session.user.name = user.name;

        res.redirect("/profile");

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};