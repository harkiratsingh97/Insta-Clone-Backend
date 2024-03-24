const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.addCommentToPost = async (req, res) => {
	try {
		const checkPost = await Post.findById(req.body.post);
		if (checkPost) {
			const newComment = await Comment.create({
				...req.body,
				from: req.user.id,
			});
			if (newComment) {
				checkPost.comments.push(newComment.id);
				checkPost.save();
				return res.json({ message: "Comment added", data: newComment });
			}
		}
	} catch (error) {
		console.log(error);
	}
};
