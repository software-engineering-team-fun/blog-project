const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));


app.get('/home', (req,res,next) => {
    res.send("Hello Welcome home")
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/about.html'));
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);