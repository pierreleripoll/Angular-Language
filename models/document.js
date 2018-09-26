var Promise = require('bluebird');

var conDB = require('../data/conDB');


exports.insertDocuments = function(doc) {
  // Get the documents collection
  return new Promise(function(resolve, reject){
    var collection = conDB.get().collection('documents');

    collection.insertOne(doc)
    .then(function(result){
      resolve(result);
    })
    .catch(function(err){
      console.error(err.message);
      reject(err);
    });
  })
}

exports.findAllDocuments = function() {
  // Get the documents collection
  return new Promise(function(resolve, reject){
    var collection = conDB.get().collection('documents');
    docs=collection.find().toArray()
    .then(function(docs) {
      resolve(docs)
    });
  })
}

exports.findWord = function(wordToLookFor, caseToLookFor) {
  return new Promise(function(resolve, reject){
    var collection = conDB.get().collection('documents');
    docs = collection.find({word : wordToLookFor, case : caseToLookFor}).toArray()
    .then(function(docs){
      resolve(docs)
    })
  })
}

exports.deleteWord = function(wordToLookFor, caseToLookFor) {
  return new Promise(function(resolve, reject){
    var collection = conDB.get().collection('documents');
    docs = collection.deleteOne({word : wordToLookFor, case: caseToLookFor})
    .then(function(docs){
      resolve(docs)
    })
  })
}

exports.dropCollection = function(){
  var collection = conDB.get().collection('documents');
  return new Promise(function(resolve,reject){
    collection.drop()
    .then(function(){
      resolve();
    })
    .catch(function(err){
      reject(err);
    })
  })

}
