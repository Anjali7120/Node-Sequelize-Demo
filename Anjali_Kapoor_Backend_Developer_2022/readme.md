Project created By Anjali Kapoor

to start this project run these commands

npm install
node app.js

change your database credentials go to config.json file and replace accordingly

in app.js file i have mention all my api routes

http://localhost:8080/news/add
// pass this in body 
{
    "article": "NEWs 1",
    "title": "SOCIAL MEDIA",
    "subtitle": "Is it a boon or bane for society ",
    "description": "Social Media is a boon for society it is totally depends on us how we use it .",
    "image": "http://images.com/news1.png",
    "author_name": "Anjali Kapoor"
}


// via put api you can update the article status as read 
http://localhost:8080/news/update-news
{
    "id" : 1,
    "read_status" : "read"
}

// this api used to fetch all news articles according to the requirement and get paginated data 
http://localhost:8080/news/getAll
{"limit": 4, "offset": 3}

// Api to fetch all details of the article
http://localhost:8080/news/detail
{
    "id": 1
}

// delete news article via this api
http://localhost:8080/news/delete
{
    "id" :1
}

I have use express-validator for validations 
