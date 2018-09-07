const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

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

// How to retrieve data from client side js?
app.get('/assembler', urlencodedParser, (req, res) => {
    const mainboard = req.body.mainboard;
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

app.post('/builder', textParser, (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to Database!');
        const db = client.db('mtg');
        const cards = db.collection('cards')
        let userInput = req.body;
        let card = cards.find({$text: {$search: "\"" + userInput + "\""}}).toArray();
        console.log(card);
        res.send(card);
        client.close();
    })
});

app.put('/builder', jsonParser, (req, res) => {
    res.send(req.body);
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

app.listen(3000, function (err) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`This HTTP server is running on port ${port}`);
});