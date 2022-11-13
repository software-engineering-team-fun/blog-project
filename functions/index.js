//to start the local development server run 'firebase emulators:start'

const functions = require('firebase-functions')
const express = require('express');
const path = require('path');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const cors = require('cors')({origin: true});

const app = express();
app.use(expressCspHeader({
    directives: {
      'default-src': [expressCspHeader.NONE],
      'img-src': [expressCspHeader.SELF],
    }
}));
app.use(cors);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

app.get('/home', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// TODO: Only make this accessible when authenticated
app.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/create.html'));
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 


exports.app = functions.https.onRequest(app);
