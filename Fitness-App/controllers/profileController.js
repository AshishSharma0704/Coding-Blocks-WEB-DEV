const User = require("../models/User");
const Workout = require("../models/Workout");

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.session.user.id);

        const workouts = await Workout.find({
            user: req.session.user.id
        }).sort({ workoutDate: -1 });

        res.render("profile", {
            user,
            workouts
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Server Error");

    }

};

