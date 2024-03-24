const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

// Controller function to Sign Up
module.exports.signUp = async (req, res) => {
	try {
		// Check if username already exists
		const existingUsername = await User.findOne({
			username: req.body.username,
		});
		if (existingUsername) {
			return res.json({ message: "Username already exists" });
		}

		// Check if email already exists
		const existingEmail = await User.findOne({ email: req.body.email });
		if (existingEmail) {
			return res.json({ message: "Email already exists" });
		}

		// Creating a new user
		const newUser = await User.create(req.body);
		return res.json({ message: "Successfully created", data: newUser });
	} catch (err) {
		console.log(err);
		return res.json({ message: "Internal server error", error: err.message });
	}
};

// Controller function to Sign In
module.exports.signIn = async (req, res) => {
	try {
		//Check if username already exists
		const checkUsername = await User.findOne({ username: req.body.username });
		if (checkUsername) {
			let token = jwt.sign({ ...checkUsername }, env.secret, {
				expiresIn: "1h",
			});
			if (checkUsername.password === req.body.password) {
				res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
				return res
					.status(200)
					.json({ message: "Username", user: checkUsername });
			}
		}
		return res.status(401).json({ message: "Invalid username / password" });
	} catch (err) {
		console.log(err);

		return res.json({ message: "Internal server error" });
	}
};

// Controller function to log out user
module.exports.signOut = async (req, res) => {
	try {
		res.cookie("token", "", { expires: new Date(0) });
		return res.json({ message: "Logged out" });
	} catch (error) {}
};

// Controller function to get all the registered users
module.exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		return res.json({ users: users });
	} catch (err) {
		console.log(err);
		return;
	}
};

//Get User
module.exports.getUserPosts = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (user) {
			return res.json({
				message: "Got All Posts of User",
				data: user,
			});
		}
		return res.json({ message: "Did not found any posts" });
	} catch (error) {
		console.log(error);
		// return res.json(err);
	}
};

// Get user with Posts and Comments
module.exports.getUserWithPosts = async (req, res) => {
	try {
		const userWithPosts = await User.findById(req.user.id).populate({
			path: "posts",
			model: "Post",
			populate: { path: "comments", model: "Comment" },
		});

		if (userWithPosts) {
			return res.json({
				message: "Got All Posts of User",
				data: userWithPosts,
			});
		}
		return res.json({ message: "Did not found any posts" });
	} catch (error) {
		console.log(error);
		// return res.json(err);
	}
};
