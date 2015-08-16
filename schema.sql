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
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE topics (
	id INTEGER PRIMARY KEY autoincrement,
	title TEXT,
	summary TEXT,
	body TEXT,
	comment_count INTEGER,
	comment_update TEXT,
	user_id INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	body TEXT,
	like_count INTEGER,
	topic_id INTEGER,
	comment_id INTEGER,
	user_id INTEGER, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
