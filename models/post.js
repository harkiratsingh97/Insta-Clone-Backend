const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// requied: true,
		},
		image: {
			type: String,
			// requied: true,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
