var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var cookieParser = require('cookie-parser');
var cookie = require('cookies');
var _ = require('underscore');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dreamlucid.db');
var sort = "recent";
var user_id;

app.use(cookieParser());
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
	res.cookie('username', 'sharon');
	console.log(req.cookies);
})


app.listen('3000', function(){
	console.log("Listening on port 3000!");
})