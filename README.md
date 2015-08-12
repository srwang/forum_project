# forum_project

Wireframe: 
![Wireframe](image/wireframe.jpg)

User Stories:
-user starts on landing page, which shows forum topics
    -can create username using input box at upper right
    -can click and add new topic using button at bottom
-on topic page:
    -can add new post using input box
    -can add a comment using box/ (will pop out comment)/comment

Routing:
-landing: /dreamlucid
-go to create username: /dreamlucid/username
-create username page: /dreamlucid/username/:userName
-create topic: /dreamlucid/topic
-topic page: /dreamlucid/topic/:topicID
-create posts: /dreamlucid/topic/:topicID/:postId
-create comments: /dreamlucid/topic/:topicID/:commentId
-edit comments: /dreamlucid/topic/:topicID/:commentId/edit

My ERD:
user: id, username, password, postcount, datestamp
topics: id, title, tags, summary, timestamp 
posts: id, text, likes_count, user_id, topics_id, timestamp
comments: id, text, post_id, user_id, timestamp  

Pseudocode: 
-create schema
-create seed file for one fake user (me)

-landing page:
    -create index.ejs, looping through topics database, with two input boxes and button
    -username input will go to /dreamlucid/username/:userName and then route back to /dreamlucid
    -topic will route to /dreamlucid/topic/:topicID and then back to /dreamlucid
    -app.js does db.all to get topics information

-topic page:
    -app.js does db.all to get all posts associated with specific topic id
    -each topic has a "like" option- onclick, increment and resave topic's "likecount" in sql
        -run return array of topics in js to sort by likecount before rendering
    -each_topic.ejs creates text for each topic and form for comments
    -each comment will include an edit option (on edit, will say "edited")- use PUT for this, route to /edit and then back to /dreamlucid/:topicName

-comments
-create logout button
-keep username passwords (boolean value true/false)?
-stretch goal: can get a user page 