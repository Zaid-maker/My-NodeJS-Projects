require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const passport = require("passport");
const session = require("express-session");

app.get("/", (req, res) => {
  res.sendFile("auth.html", {
    root: __dirname,
  });
});

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

var userProfile;
app.use(passport.initialize());
app.use(passport.session());

app.get("/success", (req, res) => {
  res.send(userProfile);
});
app.get("/error", (req, res) => {
  res.send("Error logging in!");
});

passport.serializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/**
 * TWITTER AUTHENTICATION 🐦
 */
const TwitterStrategy = require("passport-twitter").Strategy;

const TWITTER_APP_ID = "7576576757";
const TWITTER_APP_SECRET = "";

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_APP_ID,
      consumerSecret: TWITTER_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      userProfile = profile;
      return cb(null, profile);
    }
  )
);

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
