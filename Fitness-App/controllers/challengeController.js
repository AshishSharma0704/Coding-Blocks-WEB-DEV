const Challenge = require("../models/Challenge");
const UserChallenge = require("../models/UserChallenge");
exports.getChallenges = async (req, res) => {

    try {

        const challenges = await Challenge.find();

        res.render("challenges", {
            challenges
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};


exports.joinChallenge = async (req, res) => {

    try {

        const challengeId = req.params.id;

        const alreadyJoined = await UserChallenge.findOne({

            user: req.session.user.id,
            challenge: challengeId

        });

        if (alreadyJoined) {

            return res.redirect("/challenges");

        }

        await UserChallenge.create({

            user: req.session.user.id,
            challenge: challengeId

        });

        res.redirect("/my-challenges");

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};

exports.getMyChallenges = async (req, res) => {

    try {

        const userChallenges = await UserChallenge.find({

            user: req.session.user.id

        }).populate("challenge");

        res.render("myChallenges", {

            userChallenges

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};

exports.updateProgress = async (req, res) => {

    try {

        const userChallenge = await UserChallenge
            .findById(req.params.id)
            .populate("challenge");

        if (!userChallenge) {

            return res.redirect("/my-challenges");

        }

        // Security: only the owner can update
        if (
            userChallenge.user.toString() !==
            req.session.user.id
        ) {

            return res.status(403).send("Unauthorized");

        }

        if (!userChallenge.completed) {

            userChallenge.progress++;

            if (
                userChallenge.progress >=
                userChallenge.challenge.target
            ) {

                userChallenge.progress =
                    userChallenge.challenge.target;

                userChallenge.completed = true;

            }

            await userChallenge.save();

        }

        res.redirect("/my-challenges");

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};

exports.getUpdateProgress = async (req, res) => {

    try {

        const userChallenge = await UserChallenge
            .findById(req.params.id)
            .populate("challenge");

        if (!userChallenge) {

            return res.redirect("/my-challenges");

        }

        if (
            userChallenge.user.toString() !==
            req.session.user.id
        ) {

            return res.status(403).send("Unauthorized");

        }

        res.render("updateProgress", {

            userChallenge

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};

exports.postUpdateProgress = async (req, res) => {

    try {

        const userChallenge = await UserChallenge
            .findById(req.params.id)
            .populate("challenge");

        if (!userChallenge) {

            return res.redirect("/my-challenges");

        }

        if (
            userChallenge.user.toString() !==
            req.session.user.id
        ) {

            return res.status(403).send("Unauthorized");

        }

        const addedProgress = Number(req.body.progress);

        if (isNaN(addedProgress) || addedProgress <= 0) {

            return res.redirect(
                `/my-challenges/update/${req.params.id}`
            );

        }

        userChallenge.progress += addedProgress;

        if (
            userChallenge.progress >=
            userChallenge.challenge.target
        ) {

            userChallenge.progress =
                userChallenge.challenge.target;

            userChallenge.completed = true;

        }

        await userChallenge.save();

        res.redirect("/my-challenges");

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};