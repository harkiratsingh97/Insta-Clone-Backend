const express = require("express");

router = express.Router();
const passport = require("passport");
const CommentController = require("../controllers/comment");

router.post(
	"/new-comment",
	passport.authenticate("jwt", { session: false }),
	CommentController.addCommentToPost
);

module.exports = router;
