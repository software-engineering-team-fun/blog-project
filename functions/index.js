// to start the local development server run 'firebase emulators:start'

const functions = require("firebase-functions");
const admin = require("firebase-admin")
const serviceAccount = require("./privatekey.json");
const bodyParser = require("body-parser")
const express = require("express");
const { engine } = require("express-handlebars")
const path = require("path");
const cors = require("cors")({origin: true});
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);


//setting up cors and bodyparser
const app = express();
app.use(cors);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// view engine setup
app.engine('hbs', engine());
app.set("views", path.join(__dirname, "./pages"));
app.set("view engine", "hbs");

//initialize firebase
admin.initializeApp({
  projectId: "final-project-9b3c9",
  databaseURL: 'https://final-project-9b3c9.firebaseio.com',
  credential: admin.credential.cert(serviceAccount)
});

//initialize database and collection 
const db = admin.firestore();

//routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/home", (req, res) => {
    res.render("index")
});

app.get("/about", function(req, res) {
    res.render("about")
});

app.get("/login", function(req, res) {
    res.render("login")
});

app.get("/create", function(req, res) {
  res.render("create")
});
app.get("/logout", function(req, res) {
  res.render("logout")
});

app.get("/contact", function(req, res) {
  res.render("contact")
});
// Global posts
app.get("/feed", async function(req, res) {
  var ids = [];
  var blogs = [];
  var dat;
  await db.collection("blogs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        dat = doc.data()
        // I know we joked about not caring about security but since we're deploying publicly
        // this is probably the responsible thing to do
        dat.title = DOMPurify.sanitize(dat.title, {USE_PROFILES: {html: true}});
        dat.body = DOMPurify.sanitize(dat.body, {USE_PROFILES: {html: true}});
        dat.displayName = DOMPurify.sanitize(dat.displayName, {USE_PROFILES: {html: true}});
        dat.userID = DOMPurify.sanitize(dat.userID, {USE_PROFILES: {html: true}});

        ids.push(doc.id)
        blogs.push(dat)
        console.log("Feed:", doc.id, " => ", doc.data());
        //console.log("typeof(doc.data())", doc.data().body)
    });
  });
  //console.log("Content to be loaded:", { blogIds: ids, blogDatas: blogs});
  // Have to reverse to get the newest one first
  res.render("feed", { blogIds: ids.reverse(), blogDatas: blogs.reverse()});
});

// user posts I guess
app.get("/dashboard", function(req, res) {
  res.render("dashboard")
});

//send to database
app.post('/sendBlog', async (req, res) =>{
  const blog = {
    title: req.body.title,
    body: req.body.body,
    displayName: req.body.displayName,
    userID: req.body.userID
  }
  console.log(blog)
  db.collection("blogs").add(blog)
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
    res.redirect("/feed");
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
})

app.get('/grabBlogs', (req, res) => {
  db.collection("blogs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
    res.redirect('/')
  });
})

//send to database
app.post('/sendContact', async (req, res) =>{
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    msg: req.body.msg
  }
  db.collection("contacts").add(contact)
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
    res.redirect("/feed");
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
})

process.on("uncaughtException", function(err) {
  console.log(err);
});

exports.app = functions.https.onRequest(app);
/* eslint-disable eol-last */