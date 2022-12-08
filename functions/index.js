// to start the local development server run 'firebase emulators:start'

const functions = require("firebase-functions");
const admin = require("firebase-admin")
const serviceAccount = require("./final-project-9b3c9-firebase-adminsdk-dr6w0-8fc882c766.json");
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
        dat.body = DOMPurify.sanitize(dat.body, {USE_PROFILES: {html: true}});
        ids.push(doc.id)
        blogs.push(dat)
        console.log("Feed:", doc.id, " => ", doc.data());
        //console.log("typeof(doc.data())", doc.data().body)
    });
  });
  console.log("Content to be loaded:", { blogIds: ids, blogDatas: blogs});
  res.render("feed", { blogIds: ids, blogDatas: blogs});
});

// user posts I guess
app.get("/dashboard", function(req, res) {
  res.render("dashboard")
});

//send to database
app.post('/sendBlog', async (req, res) =>{
  const blog = {
    title: req.body.title,
    body: req.body.body
  }
  console.log(blog)
  db.collection("blogs").add(blog)
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
    res.redirect("/");
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

process.on("uncaughtException", function(err) {
  console.log(err);
});
exports.app = functions.https.onRequest(app);
/* eslint-disable eol-last */