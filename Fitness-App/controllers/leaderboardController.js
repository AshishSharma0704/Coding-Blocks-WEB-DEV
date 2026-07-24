const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {

    try {

        const users = await User.find().sort({ points: -1 });

        const currentUserIndex = users.findIndex(
            user =>
            user._id.toString() ===
            req.session.user.id
        );

        const currentRank = currentUserIndex + 1;

        res.render("leaderboard", {
            users,
            currentUserId: req.session.user.id,
            currentRank
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};