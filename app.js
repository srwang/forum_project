var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dreamlucid.db');

app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
	res.redirect('/dreamlucid');
})

app.get('/dreamlucid', function (req, res){
	db.all('SELECT * FROM topics', function (err, topics){
		console.log(topics);
		res.render('index.ejs', {topics: topics});
	})
})

app.get('dreamlucid/createtopic', function (req, res){

})

app.post('/dreamlucid/:topicID', function (req, res){
	db.run('INSERT INTO topics (title, summary, body, likes_count, user_id) VALUES (?,?,?,?,?)', req.body.title, req.body.summary, req.body.description, 0, 0);
})

app.get('/username', function (req, res))

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.listen('3000', function(){
	console.log("Listening on port 3000!");
})