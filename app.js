console.log('hello you');

var express = require('express');
var app = express();
var homeController = require('./homeController');
var PORT = 8080;

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	
	res.render('home');

});

app.get('/about', function(req, res) {
	
	res.render('about me');
});





app.listen (PORT, function() {
	console.log(`listening on port ${PORT}`);
});