const express = require("express");
const multer = require("multer");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file);
  return res.send("You are allowed to upload a single file");
});
//Multiple files
app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
  console.log(req.files);
  return res.send("You are allowed to upload multiple files at max of 10");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
