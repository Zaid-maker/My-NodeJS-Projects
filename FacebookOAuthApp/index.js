require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const Routes = require("./route.js");
const Config = require("./Config");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: Config.facebookAuth.clientID,
      clientSecret: Config.facebookAuth.clientSecret,
      callbackURL: Config.facebookAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.use("/", Routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
