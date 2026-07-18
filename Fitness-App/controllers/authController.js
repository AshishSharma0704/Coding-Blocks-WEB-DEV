const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET Register Page
exports.getRegister = (req, res) => {
    res.render("register");
};

// POST Register
exports.postRegister = async (req, res) => {
    try {

        const {
            name,
            email,
            age,
            height,
            weight,
            password,
            confirmPassword
        } = req.body;

        // Check empty fields
        if (
            !name ||
            !email ||
            !age ||
            !height ||
            !weight ||
            !password ||
            !confirmPassword
        ) {
            return res.send("All fields are required.");
        }

        // Check password match
        if (password !== confirmPassword) {
            return res.send("Passwords do not match.");
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email is already registered.");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            age,
            height,
            weight,
            password: hashedPassword
        });

        // Save user
        await newUser.save();

        console.log("User Registered Successfully");

        // Redirect to login page
        res.redirect("/login");

    } catch (error) {

        console.error(error);

        res.status(500).send("Internal Server Error");
    }
};

// GET Login Page
exports.getLogin = (req, res) => {
    res.render("login");
};

// POST Login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are filled
        if (!email || !password) {
            return res.send("Email and Password are required.");
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid Email or Password.");
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid Email or Password.");
        }

        // Create session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // Redirect to dashboard
        res.redirect("/dashboard");

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};