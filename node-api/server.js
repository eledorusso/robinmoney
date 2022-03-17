const express = require('express')
const app = express();
const url = require('url'); // to parse url
const https = require('https');// to send https requests 
const mongoClient = require('mongodb').MongoClient

// initialize geolocation api base url
const rapidAPIBaseUrl = "https://rapidapi.p.rapidapi.com/json/?ip=";

// create basic server and implement handling different requests

app.listen(4000,function(){
    initialize();
    console.log("listening on 4000");
})