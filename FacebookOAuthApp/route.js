const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/index.ejs");
});

//profile router
router.get("/profile", isLoggedIn, function (req, res) {
  res.render("pages/profile.ejs", { user: req.user });
});

//error router
router.get("/error", isLoggedIn, function (req, res) {
  res.render("pages/error.ejs");
});

//auth router
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

//callback router
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  })
);

//logout router
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//isLoggedIn Function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
