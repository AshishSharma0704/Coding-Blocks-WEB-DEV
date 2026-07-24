const User = require("../models/User");
const Workout = require("../models/Workout");
const UserChallenge = require("../models/UserChallenge");

exports.getProfile = async (req, res) => {

    try {

        const userId = req.session.user.id;

        const user = await User.findById(userId);

        const workouts = await Workout.find({
            user: userId
        })
        .sort({ workoutDate: -1 })
        .limit(5);

        // Statistics
        const totalWorkouts = await Workout.countDocuments({
            user: userId
        });

        const totalChallenges = await UserChallenge.countDocuments({
            user: userId
        });

        const totalCalories = await Workout.aggregate([
            {
                $match: {
                    user: user._id
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$caloriesBurned"
                    }
                }
            }
        ]);

        const caloriesBurned =
            totalCalories.length > 0
                ? totalCalories[0].total
                : 0;

        res.render("profile", {
            user,
            workouts,
            totalWorkouts,
            totalChallenges,
            caloriesBurned
        });

    } catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};