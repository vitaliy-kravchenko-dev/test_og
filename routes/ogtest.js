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
      'accept-language': 'en',
      'accept': 'text/html;'
    },
    encoding: null
  };

  request(options, function (err, response, body) {
    if (err) return res.json({error: err});

    result.request_result = response;
    result.request_body = body;

    ogs(options, function (err, data) {
      console.log(err);
      if (err) return res.json({error: err});

      console.log(data);
      result.og_data = data;

      res.json(result);
    });
  });
});

module.exports = router;
