var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var _ = require('underscore');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dreamlucid.db');
var user_id;
var sort = "recent";

app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
	res.redirect('/dreamlucid');
})

app.get('/dreamlucid', function (req, res){
	if (sort === "comments") {
		db.all('SELECT * FROM topics ORDER BY comment_count DESC', function (err, topics){
			res.render('index.ejs', {topics: topics, sort: sort});
		})
	} else if (sort === "recent") {
		db.all('SELECT * FROM topics ORDER BY comment_update DESC', function (err, topics){
			res.render('index.ejs', {topics: topics, sort: sort});
		})
	}
}) 

app.post('/dreamlucid/layout', function (req, res){ 
	sort = req.body.chooseOrder;
	res.redirect('/dreamlucid');	
})

app.get('/dreamlucid/username', function (req, res){
	res.render('create_username.ejs');
})

app.post('/dreamlucid/username/create', function (req, res){
	db.run('INSERT INTO users (username, password, postcount) VALUES (?,?,?)', req.body.userName, req.body.password, 0, function (err){
		if (err) throw err;
	})
	db.get('SELECT * FROM users WHERE username=?', req.body.userName, function (err, user){
		user_id = user.id;
		res.redirect('/dreamlucid/username/' + user.id + "/created")
	})
})

app.get('/dreamlucid/username/:userID/created', function (req, res){
	db.get('SELECT * FROM users WHERE id=?', req.params.userID, function (err, user){
		res.render('account_created.ejs', {username: user.username, password: user.password})	
	})
})

app.post('/dreamlucid/topic', function (req, res){
	db.run('INSERT INTO topics (title, summary, body, comment_count, comment_update, user_id) VALUES (?,?,?,?,?,?)', req.body.title, req.body.summary, req.body.body, 0, "none", user_id, function (err){
		if (err) throw err;
	})
	res.redirect('/dreamlucid');
})

app.get('/dreamlucid/topic/:topicID', function (req, res){ //working here
	db.get('SELECT * FROM topics WHERE id=?', req.params.topicID, function (err, topic){
		db.all('SELECT * FROM comments WHERE topic_id=? ORDER BY like_count DESC', req.params.topicID, function (err, comments){
			res.render('topic.ejs', {topic: topic, comments: comments});		
		})
	})
})

app.post('/dreamlucid/topic/:topicID/comment', function (req, res){
	db.run('INSERT INTO comments (body, like_count, topic_id, user_id) VALUES (?,?,?,?)', req.body.replyBody, 0, parseInt(req.params.topicID), user_id, function (err){
		if (err) throw err;
	})
	db.get('SELECT * FROM comments where topic_id=?', parseInt(req.params.topicID), function (err, comment){
		db.run('UPDATE topics SET comment_update=? WHERE id=?', comment.updated_at, parseInt(req.params.topicID), function (err){
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

app.get('/dreamlucid/topic/:topicID/comment/:commentID/edit', function (req, res){ //working here
	db.get('SELECT * FROM comments where id=?', parseInt(req.params.commentID), function (err, comment){
		if (err) throw err;
		else {
			res.render('edit_comment.ejs', {comment: comment});
		}
	})
})

app.put('/dreamlucid/topic/:topicID/comment/:commentID', function (req, res){
	db.run('UPDATE comments SET body=? where id=?', req.body.editCommentBody, parseInt(req.params.commentID), function (err){
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