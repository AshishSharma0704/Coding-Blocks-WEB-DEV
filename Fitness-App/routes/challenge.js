const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const challengeController = require("../controllers/challengeController");

router.get(
    "/challenges",
    auth,
    challengeController.getChallenges
);

router.get(
    "/challenges/join/:id",
    auth,
    challengeController.joinChallenge
);

router.get(
    "/my-challenges",
    auth,
    challengeController.getMyChallenges
);

router.get(
    "/my-challenges/progress/:id",
    auth,
    challengeController.updateProgress
);

router.get(
    "/my-challenges/update/:id",
    auth,
    challengeController.getUpdateProgress
);

router.post(
    "/my-challenges/update/:id",
    auth,
    challengeController.postUpdateProgress
);

module.exports = router;