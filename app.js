const Promise = require('bluebird');
const express = require('express');
const app = express();
const MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);
const assert = require('assert');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
},require('./controllers'))


var conDB = require('./data/conDB');

var model = require('./models/document')

var db;

doc = {
  word : "stark",
  case : "adjective",
  neutrum : "starkt",
  plural: "starka",
  comparative: "starkare",
  superlative: "starkaste",
  translation: "strong, ...",
  definition: "..."
};

conDB.connect()
.then(function(){
  app.listen(8000, () => {
    console.log('Server started!');
  });

  model.findAllDocuments()
  .then(function(docs){
    console.log("here are your documents : ");
    console.log(docs);
  })

  // model.dropCollection()
  // .then(function(){
  //   console.log("collection droped");
  // })
  // .catch(function(err){
  //   console.error(err.message);
  //   console.log("error while droping the collection");
  // })

  // model.insertDocuments(doc)
  // .then(function(result){
  //   console.log("Document inserted" + result);
  // })
  // .catch(function(err){
  //   console.log("Error with the insertion : " + err.message);
  // })
})
