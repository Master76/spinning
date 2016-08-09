var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.render("index");
});

app.listen(76, function () {
    console.log("listening on port 76");
});

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');