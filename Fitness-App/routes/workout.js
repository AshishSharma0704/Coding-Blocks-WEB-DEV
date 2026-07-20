const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const workoutController = require("../controllers/workoutController");

router.get("/workouts", auth, workoutController.getWorkouts);

router.get("/workouts/add", auth, workoutController.getAddWorkout);
router.post("/workouts/add", auth, workoutController.postAddWorkout);

router.get("/workouts/edit/:id", auth, workoutController.getEditWorkout);
router.post("/workouts/edit/:id", auth, workoutController.postEditWorkout);

router.get("/workouts/delete/:id", auth, workoutController.deleteWorkout);
module.exports = router;