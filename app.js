const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use('/assets', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to Home!');
        const db = client.db('mtg');
        const cards = db.collection('cards');

        cards.find({}).toArray((err, documents) => {
            client.close();
            res.render('index')
        });
    });
});

app.get('/query', (req, res) => {

});

// How to retrieve data from client side js?
app.get('/assembler', urlencodedParser, (req, res) => {
    const mainboard = req.body.mainboard;
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to MongoDB!');
        const db = client.db('mtg');
        console.log('Connected successfully to MTG!');
        const cards = db.collection('cards');
        console.log('Connected successfully to Cards');
        cards.find({cardName}).toArray((err, documents) => {
            client.close();
        });
    });
});

app.get('/tracker', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to Tracker!');
        const db = client.db('mtg');
        const cards = db.collection('cards');

        cards.find({}).toArray((err, documents) => {
            client.close();
            res.render('tracker')
        });
    });
});

app.get('/builder', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to Builder!');
        const db = client.db('mtg');
        const cards = db.collection('cards');

        cards.find({}).toArray((err, cards) => {
        client.close();
        res.render('builder');
        });
    });
});



app.listen(3000, function (err) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`This HTTP server is running on port ${port}`);
});