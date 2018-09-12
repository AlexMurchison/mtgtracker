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
const dbName = 'mtg';

app.use('/assets', express.static('public'));
app.set('view engine', 'pug');


const findCards = (db, queryInput, callback) => {
    const collection = db.collection('cards');
    collection.findOne({$text: {$search: "\"" + queryInput + "\""}}, (err, docs) => {
        console.log(`Found the following records:`);
        console.log(docs);
        callback(docs);
    });
};

const findCard = (db, queryInput, callback) => {
    const collection = db.collection('cards');
    collection.findOne({$text: {$search: "\"" + queryInput + "\""}}, (err, docs) => {
        console.log(`Found the following records:`);
        console.log(docs);
        callback(docs);
    });
};

app.get('/', (req, res) => {
    console.log('Connected successfully to Home!');
    res.render('index')
});

// How to retrieve data from client side js?
app.get('/assembler', urlencodedParser, (req, res) => {
    const mainboard = req.body.mainboard;
});

app.get('/builder', (req, res) => {
    console.log('Connected successfully to Builder!');
    res.render('builder');
});

app.get('/api', (req, res) => {
    let cardname = req.query.cardname;
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected correctly to Database!');
        const db = client.db(dbName);
        const collection = db.collection('cards');
        console.log(`Searching for ${cardname}`);;
        findCard(db, cardname, (doc) => {
            if (doc == null) {
                res.send(false);
            } else {
                client.close();
                res.send(doc);
            }
        });
    });
});

app.post('/builder', jsonParser, (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected correctly to Database!');
        const db = client.db(dbName);
        let userInput = req.body.cardname;
        console.log(userInput);
        findCards(db, userInput, (docs) => {
            client.close();
            res.send(docs);
        });
    });
});

app.put('/builder', jsonParser, (req, res) => {
    res.send(req.body);
});

app.get('/tracker', (req, res) => {
    console.log('Connected successfully to Tracker!');
    res.render('tracker')
});

app.listen(3000, function (err) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`This HTTP server is running on port ${port}`);
});