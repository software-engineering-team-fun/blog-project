// to start the local development server run 'firebase emulators:start'

const functions = require("firebase-functions");
const express = require("express");
const { engine } = require("express-handlebars")
const path = require("path");
const cors = require("cors")({origin: true});

const app = express();
app.use(cors);
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('hbs', engine());
app.set("views", path.join(__dirname, "./pages"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    //res.send("Working on basic.")
    res.render("index");
});

app.get("/home", (req, res) => {
    res.render("index")
  // res.sendFile(path.join(__dirname, "../public/pages/index.html"));
});

app.get("/about", function(req, res) {
    res.render("about")
  // res.sendFile(path.join(__dirname, "../public/pages/about.html"));
});

app.get("/login", function(req, res) {
    res.render("login")
  // res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});

app.get("/create", function(req, res) {
  res.render("create")
// res.sendFile(path.join(__dirname, "../public/pages/about.html"));
});
process.on("uncaughtException", function(err) {
  console.log(err);
});
exports.app = functions.https.onRequest(app);
/* eslint-disable eol-last */