const faker = require('faker')
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

// Stock document to insert
function Stock() {
    let document = {
        "stock"     : faker.address.countryCode(),
        "price"     : new mongodb.Double(faker.commerce.price()),
        "timeStamp" : new Date()
    };

    return document;
}

// Insert Documents
const insertDocuments = function (db) {

    const collection = db.collection(collectionName);

    // insert and sleep for 2 seconds
    setInterval(() => {
        let stock = new Stock();
        console.log("Inserting stock: " + JSON.stringify(stock));

        collection.insertOne(stock)}, 2000);
}

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Start generating stock quotes.");
    console.log("Connected successfully to server: " + url);
    console.log("Database: " + dbName);
    console.log("Collection: " + collectionName);
    const db = client.db(dbName);

    // will need to ctrl-c to stop inserting docs
    insertDocuments(db);
});