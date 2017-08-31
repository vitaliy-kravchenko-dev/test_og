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
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-encoding': "gzip, deflate, br",
      'user-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3',
      host: "www.linkedin.com"
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
