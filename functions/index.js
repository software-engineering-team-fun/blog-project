//to start the local development server run 'firebase emulators:start'

const functions = require('firebase-functions')
const express = require('express');
const path = require('path');
const cors = require('cors')({origin: true});

const app = express();
app.use(cors);
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.htl'));
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

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

exports.app = functions.https.onRequest(app);

app.listen(port);