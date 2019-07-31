const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const assert = require('assert');

// set up .env
require('dotenv').config();

// Grab vars from .env file
// Database URL to MongoDB
const url = process.env.DB_HOST;

// Database and collection name
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Starting Change Stream Listener for Stock Quotes over $100...");
    console.log("Connected successfully to server: " + url);
    console.log("Database: " + dbName);
    console.log("Collection: " + collectionName);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define our filter
    pipeline = [ {
        $match: {"fullDocument.price": {$gte: 100}}
    }];

    // Change Stream
    const changeStream = collection.watch(pipeline);

    // Listen for changes on new docs with stock price greater than $100
    changeStream.on('change', next => {
        // process next document
        // -- The 'next' document is actually the 'FullDocument' returned by the change stream
        // -- Review the full document and you are able to access values via dot notation
        // -- Each 'operationtype' returns different things. For ex. updates have an 'updateDescription' field
        console.log("Full Document: " + JSON.stringify(next));
        console.log("Operation Type: " + next.operationType);
        console.log("Stock: " + next.fullDocument.stock);
        console.log("Price: " + next.fullDocument.price + "\n");
    });

});