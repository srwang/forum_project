var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dreamlucid.db');
var user_id;
var sort = "recent";

app.use(cookieParser());
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
	res.redirect('/dreamlucid');
})

//geotagging; googlemaps API
//create user page with stats


app.post('/', function (req, res){
	res.cookie('user', req.body.userName);
	res.cookie('pw', req.body.password);

	db.run('INSERT INTO users (username, password, postcount, logged_in) VALUES (?,?,?,?)', req.body.userName, req.body.password, 0, true, function (err){
		if (err) throw err;
	})
	db.get('SELECT * FROM users WHERE username=?', req.body.userName, function (err, user){
		res.redirect('/dreamlucid/username/' + user.id + "/created")
	})
})

app.get('/dreamlucid', function (req, res){ 
	var sort = "recent";
	if (req.cookies.sort) {
		sort = req.cookies.sort;
	}
	if (req.cookies.user) {
		db.get('SELECT * FROM users WHERE username=?', req.cookies.user, function (err, thisUser){
			renderPage(thisUser);	
		})
	} else {
		if (sort === "comments") {
			var user = {"logged_in": 2}
			db.all('SELECT * FROM topics ORDER BY comment_count DESC', function (err, topics){
				res.render('index.ejs', {topics: topics, sort: sort, user: user});
			})
		} else if (sort === "recent") {
			console.log("here")
			db.all('SELECT * FROM topics ORDER BY comment_update DESC', function (err, topics){
				res.render('index.ejs', {topics: topics, user: "wow man users"});
			})
		}	
		renderPage({"logged_in": 2});	
	}

	function renderPage (insertUser) {
		if (sort === "comments") {
			db.all('SELECT * FROM topics ORDER BY comment_count DESC', function (err, topics){
				res.render('index.ejs', {topics: topics, sort: sort, user: insertUser});
			})
		} else if (sort === "recent") {
			console.log("here")
			db.all('SELECT * FROM topics ORDER BY comment_update DESC', function (err, topics){
				res.render('index.ejs', {topics: topics, sort: sort, user: insertUser});
			})
		}			
	}
}) 

app.get('/dreamlucid/login', function (req, res){ 
	db.get('SELECT * FROM users WHERE username=?', req.query.userName, function (err, user){
		if (user) {
			if (user.password === req.query.password) {
				db.run('UPDATE users SET logged_in=? WHERE username=?', 1, req.cookies.user,function (err){
					if (err) throw err;
					res.cookie('user', req.query.userName, { path: '/' });
					res.cookie('pw', req.query.password, { path: '/' });
					res.render('login.ejs', {text: "Welcome, " + user.username});
					console.log(user);		
				})
			} else {
				res.render('login.ejs', {text: "Please type in the correct password."});
			}
		} else {
			res.render('login.ejs', {text: "This username does not exist."});
		}
	})
})

app.put('/dreamlucid/login', function (req, res){
	res.clearCookie('user', { path: '/' });
	res.clearCookie('pw', { path: '/' });
	db.run('UPDATE users SET logged_in=? WHERE username=?', 2, req.cookies.user, function (err){
		if (err) throw err;
	})
	res.redirect('/dreamlucid');
})

app.post('/dreamlucid/layout', function (req, res){ 
	res.cookie('sort', req.body.chooseOrder, { path: '/' });
	res.redirect('/dreamlucid');	
})

app.get('/dreamlucid/username', function (req, res){
	res.render('create_username.ejs');
})

app.get('/dreamlucid/username/:userID/created', function (req, res){
	db.get('SELECT * FROM users WHERE id=?', req.params.userID, function (err, user){
		res.render('account_created.ejs', {username: user.username, password: user.password})	
	})
})

app.post('/dreamlucid/topic', function (req, res){
	db.get('SELECT * FROM users where username=?', req.cookies.user, function (err, user){
		console.log(user.postcount);
		db.run('UPDATE users SET postcount=? WHERE username=?', user.postcount + 1, user.username, function (err){
			if (err) throw err;
		})
	})
	db.run('INSERT INTO topics (title, summary, body, comment_count, comment_update, username) VALUES (?,?,?,?,?,?)', req.body.title, req.body.summary, req.body.body, 0, "0", req.cookies.user, function (err){
		if (err) throw err;
	})
	res.redirect('/dreamlucid');
})

app.get('/dreamlucid/topic/:topicID', function (req, res){
	if (req.cookies.user){
		db.get('SELECT * FROM users WHERE username=?', req.cookies.user, function (err, thisUser){
			renderPage(thisUser);
		})
	} else {
		renderPage({logged_in: 2});
	}
	function renderPage (insertUser){
		db.get('SELECT * FROM topics WHERE id=?', req.params.topicID, function (err, topic){
			db.all('SELECT * FROM comments WHERE topic_id=? ORDER BY like_count DESC', req.params.topicID, function (err, comments){
				res.render('topic.ejs', {topic: topic, comments: comments, user: insertUser});
			})
		})							
	}
})

app.post('/dreamlucid/topic/:topicID/comment', function (req, res){
	db.get('SELECT * FROM users where username=?', req.cookies.user, function (err, user){
		console.log(user.postcount)
		db.run('UPDATE users SET postcount=? WHERE username=?', user.postcount + 1, user.username, function (err){
			if (err) throw err;
		})
	})
	db.run('INSERT INTO comments (body, like_count, topic_id, username) VALUES (?,?,?,?)', req.body.replyBody, 0, parseInt(req.params.topicID), req.cookies.user, function (err){
		if (err) throw err;
	})
	db.get('SELECT * FROM comments where topic_id=?', parseInt(req.params.topicID), function (err, comment){
		db.run('UPDATE topics SET comment_update=? WHERE id=?', comment.created_at, parseInt(req.params.topicID), function (err){
			if (err) throw err;
		})
	})

	db.get('SELECT * FROM topics WHERE id=?', parseInt(req.params.topicID), function (err, topic){
		var comment_count = topic.comment_count;
		comment_count++;
		db.run('UPDATE topics SET comment_count=? WHERE id=?', comment_count, parseInt(req.params.topicID), function (err){
			if (err) throw err;
		})
	})
	res.redirect('/dreamlucid/topic/' + req.params.topicID);		
})

app.post('/dreamlucid/topic/:topicID/comment/:commentID', function (req, res){
	db.get('SELECT like_count FROM comments where id=?', req.params.commentID, function (err, comment){
		if (err) throw err;
		else {
			like_count = comment.like_count + 1;

			db.run('UPDATE comments SET like_count=? WHERE id=?', like_count, req.params.commentID, function (err){
				if (err) throw err;
			})
		res.redirect('/dreamlucid/topic/' + req.params.topicID);
		}
	})
})

app.get('/dreamlucid/topic/:topicID/comment/:commentID/edit', function (req, res){ 
	db.get('SELECT * FROM comments where id=?', parseInt(req.params.commentID), function (err, comment){
		if (err) throw err;
		else {
			res.render('edit_comment.ejs', {comment: comment});
		}
	})
})

app.put('/dreamlucid/topic/:topicID/comment/:commentID', function (req, res){ 
	db.run('UPDATE comments SET body=? where id=?', req.body.editCommentBody + "\nEdited", parseInt(req.params.commentID), function (err){
		if (err) throw err;
	})
	res.redirect('/dreamlucid/topic/' + req.params.topicID);
})

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.listen('3000', function(){
	console.log("Listening on port 3000!");
})