const Promise = require('bluebird');

const MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);
const assert = require('assert');
// Connection URL

var state = {
  db: null,
}

exports.connect = function(){
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'myproject';

  return new Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      state.db = db;
      resolve();
    });
  })
}



exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
