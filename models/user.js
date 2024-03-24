const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
		},
		dob: {
			type: Date,
			// required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
			// required: true,
		},
		password: {
			type: String,
			required: true,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
	},

	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
