console.log('hello world');

// Import express module
var express = require('express');

// Instantiate express app
var app = express();

const port = 3000 ;

app.use(express.static(__dirname+"\\public"));

app.set('views', __dirname+"\\public" );

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');


// FOUTING REQUESTS 
app.get('/', function(req, res){
    res.render('test_page.html', {root: __dirname});
});

app.get('/about', function(req, res){
    res.render('about.html');
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

