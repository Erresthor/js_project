console.log('Instantiating server ...');
// Load environment variables
require("./loadEnvironment");

console.log(process.env.ATLAS_URI)

// Import external modules
var express = require('express');
const { cp } = require("fs");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var http = require('http');
var path = require('path');

// parser for the request body (can be useful to read what the client sends)
//  + increase file size possible to receive data
// var jsonParser = bodyparser.json()


// Instantiate express app
var app = express();
const port = 3000 ;

app.use(express.json());
app.use(bodyparser.json({ limit: '50mb' }));

// Useful path variables + template parameters
var serverRoot = path.join(__dirname, 'public');
var viewsPath = path.join(__dirname, 'public' , 'views');
app.use(express.static(serverRoot));
app.set('views', viewsPath ); // Used to set the views directory for the render function
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// ROUTES 
// Basic pages
const pages=require('./routes/renders');
app.use(pages);
// Pinger
const pinger=require('./send_ping');
app.use(pinger);
// API : interact with the database
const api_routes = require('./routes/api');
app.use('/api/data',api_routes);

// CONNECT TO THE DATABASE
// When connecting to mongodb via mongoose, if your mongodb uri doesn't contain any database 
// name then it will connect to test database. So you have to define your database name at the 
// end of the mongodb connection uri and it will connect to that defined database. Normally, the 
// database connection uri has the structure like:
// mongodb+srv://<username>:<password>@<cluster>/<your_desired_database>
// so you should add your database name after a / at the end of the uri --> see .env file
// [[ for now , let's just use the test database ]]
console.log(process.env.ATLAS_URI);
var databaseConnectPromise = mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Connection to database established'))
    .catch((err) => { console.log("Failed to connect to Atlas database -- error code :"); console.log(Error);  console.log('Aborting ...\n\n\n'); return Promise.reject(err);});

databaseConnectPromise.then(
    function raiseServer(){
        app.listen(port, () => {
            console.log(`Server is up on port ${port}`);
        }); 
    }
);
    
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    // do things here if needed! 
    return
});


