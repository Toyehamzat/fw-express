const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var indexRouter = require("./routes/index");
var signUpRouter = require("./routes/signUpRouter");

const mongoDb =
  "mongodb+srv://anibiseun:YaaKYzkFAAwhSCVY@cluster0.lylhcff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
db.once("open", () => {
  console.log("Database is connected");

  const User = mongoose.model(
    "User",
    new Schema({
      username: { type: String, required: true },
      password: { type: String, required: true },
    })
  );

  const app = express();
  app.set("views", __dirname);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
  app.use(passport.session());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", indexRouter);
  app.use("/sign-up", signUpRouter);

  app.listen(3000, () => console.log("app listening on port 3000!"));
});
