const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const logOutRouter = require("./routes/logOutRouter");

const mongoDb =
  "mongodb+srv://anibiseun:YaaKYzkFAAwhSCVY@cluster0.lylhcff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
db.once("open", () => {
  console.log("Database is connected");

  const app = express();
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: false }));

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.use("/", indexRouter);
  app.use("/sign-up", signUpRouter);
  app.use("/log-in", logInRouter);
  app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  app.listen(3000, () => console.log("app listening on port 3000!"));
});
