var express = require('express');
var router = express.Router();
var ogs = require('open-graph-scraper');
var request = require('request');

/* GET users listing. */
router.get('/', function (req, res) {
  var result = {};
  var custom_url = req.query.url;
  var options = {
    url: custom_url || 'http://ogp.me/'
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
