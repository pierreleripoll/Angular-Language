var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var model = require('../models/document')
var conDB = require('../data/conDB');


router.get('/', function(req, res){

  console.log("on m'appelle");
  model.findAllDocuments()
  .then(function(docs){
    console.log(docs);
    res.send(docs);
  })
});

router.get('/:case/:word', function(req,res){
  const requestedWord = req.params.word
  const requestedCase = req.params.case
  model.findWord(requestedWord,requestedCase).
  then(function(docs){
    console.log(docs);
    res.send(docs);
  })
  .catch(function(){
    res.send("Sorry no word like that");
  })
});

router.post('/:case/:word', function(req,res){
  const requestedWord = req.params.word
  const requestedCase = req.params.case
  console.log(req.body['delete']);
  if(req.body['delete'] != undefined){
    console.log("it is a delete then");
    model.deleteWord(requestedWord, requestedCase)
    .then(function(result){
      res.send('200');
    })
  }else{
    model.insertDocuments(req.body)
    .then(function(result){
      res.send('201');
    })
    .catch(function(err){
      console.log(woops);
      res.send('400');
    })
  }

});

router.put('/:case/:word', function(req,res){
  const requestedWord = req.params.word
  const requestedCase = req.params.case
  //Looking for it in my DB
  //res.send(...)
  res.send('updating word : '+requestedWord+" : "+requestedCase+"\n");
});

router.delete('/:case/:word', function(req,res){
  const requestedWord = req.params.word
  const requestedCase = req.params.case
  model.deleteWord(requestedWord, requestedCase)
  .then(function(result){
    res.send('200');
  })
});

module.exports = router;
