const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/VGU")
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("DB not connected!");
        console.error(err);
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    city: String
});

const Users = mongoose.model("Users", userSchema);

// Users.insertMany([
//     {
//         username: "Ashish",
//         password: "password123",
//         age: 22,
//         city: "Jaipur"
//     },
//     {
//         username: "Naman",
//         password: "password456",
//         age: 25,
//         city: "Delhi"
//     },{
//         username: "Rohit",
//         password: "password789",
//         age: 30,
//         city: "Mumbai"
//     },{
//         username: "Amit",
//         password: "password101",
//         age: 28,
//         city: "Bangalore"
//     }
// ]).then(() => {
//     console.log("User inserted successfully");
// }).catch((err) => {
//     console.error("Error inserting user:", err);
// });

// Users.findOne({ age: { $gt: 25 } })
//     .then((data)=> console.log(data))
//     .catch((err) => console.error("Error finding users:", err));

Users.updateOne({ username: "Ashish" }, { $set: { age: 23 } })
    .then((data) => console.log("User updated successfully:", data))
    .catch((err) => console.error("Error updating user:", err));






app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});