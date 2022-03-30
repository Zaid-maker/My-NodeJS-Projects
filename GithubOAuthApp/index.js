// Github OAUTH APPLICATION
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

//set view engine to ejs
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("pages/index", { client_id: clientID });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const axios = require("axios");

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Declare the callback route
app.get("/github/callback", (req, res) => {
  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    res.redirect("/success");
  });
});

app.get("/success", function (req, res) {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    res.render("pages/success", { userData: response.data });
  });
});
