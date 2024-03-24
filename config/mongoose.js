const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect(env.dbString).then(() => console.log("InstaDB connected"));
