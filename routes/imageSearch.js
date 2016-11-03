var express = require('express');
var router = express.Router();
var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
  key: 'AIzaSyDrGB4hQAAmOhlKoSIPi4oqBwpxmmA7GdQ',
  cx: '008724980455563292222:xbx4xhvy2eu'
});
var Search = require('../models/search.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = req.originalUrl;
  searchTerm = url.replace('/imageSearch/', '');

  paginationLimiter = searchTerm.slice(searchTerm.indexOf('=')+1, searchTerm.length);

  searchTerm = searchTerm.slice(0, searchTerm.indexOf('?'));
  Search.create({
    term: searchTerm,
    when: new Date().toJSON()
  }, function(err, newItem){
  });
  googleSearch.build({

    q: searchTerm,
    start: 5,
    fileType: "png",
    gl: "tr", //geolocation,
    lr: "lang_en",
    num: paginationLimiter, // Number of search results to return between 1 and 10, inclusive
    siteSearch: "" // Restricts results to URLs from a specified site

  }, function(error, response) {
    if(response.items === undefined) {
      res.send('Sorry something went wrong please make sure you have no more then 10 items and the route is correct.');
    } else {
      console.log(response);
      var emptyArray = [];
      for(var i = 0; i < response.items.length; i++){
        var emptyObject = {
          url: '',
          snippet: '',
          thumbnail: ''
        }
        emptyObject.url = response.items[i].link;
        emptyObject.snippet = response.items[i].snippet;
        if(response.items[i].hasOwnProperty('pagemap')){
          if(response.items[i].pagemap.hasOwnProperty('cse_image')){
            if(response.items[i].pagemap.cse_image.length !== 0){
              emptyObject.thumbnail = response.items[i].pagemap.cse_image[0].src;
            } else {
              emptyObject.thumbnail = '';
            }
          }
        }
        emptyArray.push(emptyObject);
      }

      res.send(emptyArray);
    }

  });
});

module.exports = router;
