const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		// to: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// },
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
