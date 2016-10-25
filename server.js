var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    host: 'db.imad.hasura-app.io',
    user: 'noelbjohn',
    password: process.env.DB_PASSWORD,
    database: 'noelbjohn',
    port: '5432'
}
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title: 'Article One !Noel B John',
        heading: 'Article One',
        date: 'Sept 3, 2016',
        content:`<p>
                    This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page.This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page.
                </p>
                <p>
                    This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page.This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page.
                </p>
                <p>
                    This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page.This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page. This is the contents of article one. This is a sample page.
                </p>`
    },
    'article-two':{
        title: 'Article Two !Noel B John',
        heading: 'Article Two',
        date: 'Sept 5, 2016',
        content: `<p>
                    This is the contents of article two. This is a sample page. This is the contents of article two. This is a sample page. This is the contents of article two. This is a sample page. This is the contents of article two. This is a sample page. This is the contents of article two. This is a sample page. This is the contents of article two. This is a sample page.
                </p>`
    },
    'article-three':{
        title: 'Article Three !Noel B John',
        heading: 'Article Three',
        date: 'Sept 15, 2016',
        content: `<p>
                    This is the contents of article three. This is a sample page.
                </p>`
    }
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var HTMLTemplate=`<!doctype html>
                        <head>
                            <title>
                                ${title}
                            </title>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <link href="/ui/style.css" rel="stylesheet" />
                        </head>
                        <body>
                            <div class="container">
                                <div>
                                    <a href="/">Home</a>
                                </div>
                                <hr/>
                                <h1>
                                    ${heading}
                                </h1>
                                <div>
                                    ${date.toDate()}
                                </div>
                                <div>
                                    ${content}
                                </div>
                            </div>
                        </body>
                    </html>`;
    return HTMLTemplate;
}

var pool = new Pool(config);
app.get('/test-db',function(req, res){
    pool.query('SELECT * FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function (req, res) {
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/articles/:articleName', function (req, res) {
  pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName+"'",function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else if(result.rows.length === 0){
            res.status(404).send('Article not found');
        }else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    });
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
