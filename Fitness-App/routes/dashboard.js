const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const dashboardController = require("../controllers/dashboardController");
const profileController=require("../controllers/profileController");

router.get("/dashboard",auth,dashboardController.getDashboard);
router.get("/profile",auth,profileController.getProfile);
router.get("/profile/edit", auth, dashboardController.getEditProfile);
router.post("/profile/edit",auth,dashboardController.postEditProfile);
module.exports = router;