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

exports.getEditWorkout = async (req, res) => {

    try {

        const workout = await Workout.findOne({
            _id: req.params.id,
            user: req.session.user.id
        });

        if (!workout) {
            return res.status(404).send("Workout not found");
        }

        res.render("editWorkout", {
            workout
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Server Error");

    }

};

exports.postEditWorkout = async (req, res) => {

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

        const workout = await Workout.findOneAndUpdate(

            {
                _id: req.params.id,
                user: req.session.user.id
            },

            {
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
            },

            {
                returnDocument: "after",
                runValidators: true
            }

        );

        if (!workout) {

            return res.status(404).send("Workout not found");

        }

        res.redirect("/workouts");

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};

exports.deleteWorkout = async (req, res) => {

    try {

        const workout = await Workout.findOneAndDelete({

            _id: req.params.id,
            user: req.session.user.id

        });

        if (!workout) {

            return res.redirect("/workouts");

        }

        res.redirect("/workouts");

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};