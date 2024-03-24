const passport = require("passport");
const User = require("../models/user");
var JwtStrategy = require("passport-jwt").Strategy;
var opts = {};
const env = require("./environment");

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

var cookieExtractor = function (req) {
	var token = null;
	if (req && req.cookies) {
		token = req.cookies["token"];
	}
	return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = env.secret;

//Athentication using passport Jwt
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ _id: jwt_payload._doc._id })
			.then((user) => {
				if (user) {
					return done(null, user);
				} else {
					console.log(user);
					return done(null, false);
					// or you could create a new account
				}
			})
			.catch((err) => {
				if (err) {
					return done(err, false);
				}
			});
	})
);
