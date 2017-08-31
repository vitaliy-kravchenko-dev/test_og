var express = require('express');
var router = express.Router();
var ogs = require('open-graph-scraper');

/* GET users listing. */
router.get('/', function(req, res) {
  var custom_url = req.query.url;
  var options = {
    'url': custom_url || 'http://ogp.me/'
  };

  ogs(options, function (err, data) {
    console.log(err);
    if (err) return res.json({error: err});

    console.log(data);
    res.json(data);
  });
});

module.exports = router;
