const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const workoutController = require("../controllers/workoutController");

router.get("/workouts", auth, workoutController.getWorkouts);

router.get("/workouts/add", auth, workoutController.getAddWorkout);

router.post("/workouts/add", auth, workoutController.postAddWorkout);

module.exports = router;