var express = require('express');
var router = express.Router();
var ogs = require('open-graph-scraper');
var request = require('request');

/* GET users listing. */
router.get('/', function (req, res) {
  var result = {};
  var custom_url = req.query.url;
  var options = {
    url: custom_url || 'http://ogp.me/',
    headers: {
      'accept': 'text/html',
      'accept-encoding': "gzip, deflate, sdch, br",
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
    }
  };

  request(options, function (err, response) {
    if (err) return res.json({error: err});

    result.request_result = response;
    result.request_result.body = 'removed!!';

    ogs(options, function (err, data) {
      if (err) return res.json({error: err});

      result.og_data = data;

      res.json(result);
    });
  });
});

module.exports = router;
