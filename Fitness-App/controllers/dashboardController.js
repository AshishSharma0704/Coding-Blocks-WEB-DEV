const User = require("../models/User");

exports.getDashboard = async (req, res) => {

    try {

        const user = await User.findById(req.session.user.id);
        res.render("dashboard", {
            user
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Server Error");

    }

};