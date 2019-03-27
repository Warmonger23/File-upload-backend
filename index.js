const express = require("express");
const app = express();
const file = require("./routes/file");
const signin = require("./routes/signIn");
const signup = require("./routes/signUp");
const reset = require("./routes/reset");
const image = require("./routes/image");
const video = require("./routes/video");
const signout = require("./routes/signOut");
const formidable = require("formidable");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 3020;

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));
app.use(bodyParser.json({ limit: "150mb" }));
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/user")
  .then(() => {
    console.log("Connected to mongoDB...");
  })
  .catch(err => {
    console.error("Could not connect to mongodb", err);
  });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({ secret: "my secret", resave: true, saveUninitialized: true, maxAge: 20 }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use("/signin", signin);
app.use("/signup", signup);
app.post("/file", parse_with_formidable());
app.post("/image", parse_with_formidable());
app.post("/video", parse_with_formidable());
app.use("/reset", reset);
app.use("/file", file);
app.use("/image", image);
app.use("/video", video);
app.use("/signout", signout);
app.use("/validUser", function (req, res, next) {
  console.log("Valid User ->", req.session);
  if (req.session.userID) {
    res.result = "User is authorized";
    next();
  } else {
    res.result = "User is not authorized";
    res.status(401).send();
  }
});

app.listen(PORT, () => {
  console.log("Listening to port no :", PORT);
});

app.use(function (req, res, next) {
  let currTime = process.hrtime();
  res.setHeader("timeTaken", (currTime[1] - res.reqTime) / 1000000);
  console.log("res result", res.result);
  let data;
  if (res.error) {
    data = {
      code: 404,
      data: res.error.message
    };
    res.send(data);
  } else if (!res.result) {
    res.sendStatus(404);
  } else {
    data = {
      code: 200,
      data: res.result
    };
    res.send(data);
  }
});

function parse_with_formidable() {
  return (req, res, next) => {
    console.log("Inside parse with form");
    console.log(req.session)
    let form = new formidable.IncomingForm();
    form.maxFileSize = 20000 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
      console.log(err);
      if (err)
        res.error = err;
      else
        req.files = files;
      next();
    });
  };
}
