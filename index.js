const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

app.use('/assets', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to server!');
        const db = client.db('mtg');
        const collection = db.collection('cards');

        collection.find({}).toArray((err, documents) => {
            client.close();
            res.render('index')
        });
    });
});

app.get('/tracker', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to server!');
        const db = client.db('mtg');
        const collection = db.collection('cards');

        collection.find({}).toArray((err, documents) => {
            client.close();
            res.render('tracker')
        });
    });
});

app.get('/builder', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        console.log('Connected successfully to server!');
        const db = client.db('mtg');
        const cards = db.collection('cards');
        
        collection.find({}).toArray((err, cards) => {
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