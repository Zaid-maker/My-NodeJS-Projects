// Importing modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// Initialize express app
const app = express();

// Mongodb connection url
const MONGODB_URI =
  "mongodb+srv://DevMirza:2fASGjIrsZdQqsTp@cluster0-aevor.gcp.mongodb.net/newbotlist";

// Connect to MongoDB
(async () => {
  await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
})();
mongoose.connection.on("connected", () => {
  console.log(`MongoDB successfully connected to ${MONGODB_URI} 🎉`);
});

// Using bodyparser to parse json data
app.use(bodyparser.json());

// Importing routes
const user = require("./model/user");

// Use user route when url matches /api/user/
app.use("/api/user", user);

// Creating server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
