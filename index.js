const express = require("express");
const PORT = 8080;

const db = require("./config/mongoose");

const cors = require("cors");

const app = express();

const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());

// Using CORS
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
	if (!err) console.log("server running at port ", PORT);
	else console.log(err);
});
