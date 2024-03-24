const express = require("express");
const router = express.Router();
const passport = require("passport");

const PostController = require("../controllers/post");

// API endpoint to create a new post
router.post(
	"/add-post",
	passport.authenticate("jwt", { session: false }),
	PostController.addPost
);

// API endpoint to get all posts
router.get(
	"/get-posts",
	// passport.authenticate("jwt", { session: false }),
	PostController.getAllPosts
);

//API endpoint to get all posts of a user
// router.get(
// 	"/get-user-posts",
// 	passport.authenticate("jwt", { session: false }),
// 	PostController.getUserPosts
// );
module.exports = router;
