'use strict'
// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');
const superagent = require('superagent');
const cors = require('cors');
const { request, response } = require('express');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Specify a directory for static resources

// define our method-override reference

// Set the view engine for server-side templating

// Use app cors


// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// app routes here
// -- WRITE YOUR ROUTES HERE --


app.get('/', homepage);

app.get('/favorite-quotes', showFav);

app.post('/fav', addFavourite);

// callback functions
// -- WRITE YOUR CALLBACK FUNCTIONS FOR THE ROUTES HERE --


function homepage(req, res) {
    let url = `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`

    superagent.get(url).set('User-Agent', '1.0').then(resp =>{

res.render('./pages/index.ejs' , {data: resp.body});
    }).catch(err => console.log(err));
}


function addFavourite(req, res) {
    let values = [req.body.char , req.body.quote, req.body.image, req.body.dir] 
    
    let sql = `INSERT INTO fav(simCharacter, quote, simImage, direction)
    VALUES($1, $2 , $3 , $4);`
client.query(sql, values).then(re => {
    res.send('/');

});



}


function showFav(req, res) {

    let sql = `SELECT * FROM fav`;
    client.query(sql).then(re => {
        res.render('./pages/favs.ejs' , {data: re});
    });
    
    
}

// helper functions

// app start point
client.connect().then(() =>
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
);
