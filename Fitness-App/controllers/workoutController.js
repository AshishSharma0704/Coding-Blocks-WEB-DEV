const Workout = require("../models/Workout");

// Show Add Workout Page
exports.getAddWorkout = (req, res) => {

    res.render("addWorkout");

};

// Save Workout
exports.postAddWorkout = async (req, res) => {

    try {

        const {
            exercise,
            category,
            sets,
            reps,
            weight,
            duration,
            caloriesBurned,
            distance,
            workoutDate,
            notes
        } = req.body;

        await Workout.create({
            user: req.session.user.id,
            exercise,
            category,
            sets,
            reps,
            weight,
            duration,
            caloriesBurned,
            distance,
            workoutDate,
            notes
        });

        res.redirect("/workouts");

    } catch (err) {

        console.log(err);
        res.status(500).send("Server Error");

    }

};


// Show all workouts of logged in user
exports.getWorkouts = async (req, res) => {

    try {

        const workouts = await Workout.find({

            user: req.session.user.id

        }).sort({

            workoutDate: -1

        });

        res.render("workouts", {

            workouts

        });
    }
    
    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};