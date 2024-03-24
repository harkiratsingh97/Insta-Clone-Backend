const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const passport = require("passport");

// API endpoint for Sign-up
router.post("/sign-up", UserController.signUp);

// API endpoint for Sign-in
router.post("/sign-in", UserController.signIn);

// API endpoint to Sign-out user
router.get("/sign-out", UserController.signOut);

// API to get all users
router.get(
	"/user-with-posts",
	passport.authenticate("jwt", { session: false }),
	UserController.getUserWithPosts
);

// API endpoint for Sign-in
module.exports = router;
