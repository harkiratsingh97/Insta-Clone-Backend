const Post = require("../models/post");
const User = require("../models/user");

module.exports.addPost = async (req, res) => {
	try {
		const newPost = await Post.create({ author: req.user.id, ...req.body });
		if (newPost) {
			const addPostInUser = await User.findByIdAndUpdate(
				req.user.id,
				{ $push: { posts: newPost._id } }, // Push the newPost's _id into the posts array
				{ new: true } // To return the updated user document
			);

			return res.json({ message: "Post Added", data: newPost });
		}
		return res.json({ message: "Post not created" });
	} catch (error) {
		return res.json(err);
	}
};

// Controller function to get all posts
module.exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate({
			path: "author",
			select: "username",
		});
		if (posts) {
			return res.status(200).json({ message: "Got All Posts", data: posts });
		}
		return res.json({ message: "Did not found any posts" });
	} catch (error) {
		console.log(error);
		return res.json(error);
	}
};

// // Controller function to get all posts of a User
// module.exports.getUserPosts = async (req, res) => {
// 	try {
// 		const userWithPosts = await User.findById(req.user.id).populate({
// 			path: "posts",
// 			model: "Post",
// 			populate: { path: "comments", model: "Comment" },
// 		});

// 		if (userWithPosts) {
// 			return res.json({
// 				message: "Got All Posts of User",
// 				data: userWithPosts.posts,
// 			});
// 		}
// 		return res.json({ message: "Did not found any posts" });
// 	} catch (error) {
// 		console.log(error);
// 		// return res.json(err);
// 	}
// };

