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
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE topics (
	id INTEGER PRIMARY KEY autoincrement,
	title TEXT,
	summary TEXT,
	body TEXT,
	likes_count INTEGER,
	user_id INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE posts (
	id INTEGER PRIMARY KEY autoincrement,
	body TEXT,
	likes_count INTEGER,
	user_id INTEGER,
	topic_id TEXT,  
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (topic_id) REFERENCES topics(id)
);
CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	body TEXT,
	post_id INTEGER,
	user_id INTEGER, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (post_id) REFERENCES post(id)
);
