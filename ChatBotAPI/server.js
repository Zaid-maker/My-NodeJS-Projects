/**
 * CHATBOT API - The best API available for chatbots.
 *
 * Created by: @DevMirza#6447
 */
require("dotenv").config();
const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const axios = require("axios");
const path = require("path");

// Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.get("/", (req, res) => {
  // send index file
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/chatbot", (req, res) => {
  // send json file
  jsonfile.readFile(file, function (err, obj) {
    console.error(err);
    res.json(obj.chatbot[0].msg);
  });
});

app.post("/api/chatbot", function (req, res) {
  const msg = req.body.msg;
  const url = "http://localhost:3000/api/chatbot";
  const data = {
    instances: [
      {
        msg: msg,
      },
    ],
  };

  axios({
    method: "post",
    url: url,
    data: data,
  });

  // read json file
  jsonfile.readFile(file, function (err, obj) {
    console.error(err);
    res.json(obj.chatbot[0].msg);
    // send random message on request
    res.json(obj.chatbot[Math.floor(Math.random() * obj.chatbot.length)].msg);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});

const jsonfile = require("jsonfile");
const file = "./json/chatbot.json";
const obj = {
  chatbot: [
    {
      msg: "Hello, I am ChatBot. How can I help you?",
    },
    {
      msg: "I am sorry, I don't understand you. Please try again.",
    },
  ],
};

//save json file
jsonfile.writeFile(file, obj, function (err) {
  console.error(err);
});

//read json file
jsonfile.readFile(file, function (err, obj) {
  console.error(err);
  console.dir(obj);
});

//delete json file
jsonfile.readFile(file, function (err, obj) {
  console.error(err);
  console.dir(obj);
  jsonfile.writeFile(file, obj, function (err) {
    console.error(err);
  });
});

//update json file
jsonfile.readFile(file, function (err, obj) {
  obj.chatbot[0].msg = "Hello, I am Chatbot. How can I help you?";
  obj.chatbot[1].msg = "I am sorry, I don't understand you. Please try again.";
  jsonfile.writeFile(file, obj, function (err) {
    console.error(err);
  });
});

//delete json file
jsonfile.readFile(file, function (err, obj) {
  console.error(err);
  console.dir(obj);
  jsonfile.writeFile(file, obj, function (err) {
    console.error(err);
  });
});
