var express = require('express');
var router = express.Router();
var Search = require('../models/search.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var getTermsArray = [];
  Search.find({}, function(err, docs) {
    var searchLength = 10;
    if(docs.length < 9) {
      searchLength = docs.length;
    }
    for(var i = 0; i < searchLength; i++){
      var searchedTermObject = {
        term: docs[i].term,
        when: docs[i].when
      }

      getTermsArray.unshift(searchedTermObject);
    }
    res.send(getTermsArray);
});
});

module.exports = router;
