//GOOGLE OAUTH APP
require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const port = process.env.PORT || 3001;

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
  })
);

const passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("pages/auth");
});

app.get("/success", (req, res) => {
  res.render("pages/success", { user: userProfile });
});

app.get("/error", (req, res) => {
  res.send("error logging in");
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

/*  Google AUTH  */

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);
