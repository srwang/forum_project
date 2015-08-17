DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
PRAGMA foreign_keys = ON;
CREATE TABLE users (
	id INTEGER PRIMARY KEY autoincrement,
	username TEXT,
	password TEXT,
	postcount INTEGER,
	logged_in BOOLEAN,
	location, TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE topics (
	id INTEGER PRIMARY KEY autoincrement,
	title TEXT,
	summary TEXT,
	body TEXT,
	comment_count INTEGER,
	comment_update TIMESTAMP,
	username TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (username) REFERENCES users(username)
);
CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	body TEXT,
	like_count INTEGER,
	topic_id INTEGER,
	username, TEXT, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (username) REFERENCES users(username)
);
