var express = require('express');
var router = express.Router();
var rule = require('../model/rule.model');

router.get('/:serviceType?/band/:bandId/exp/:exp', function (req, res) {
  console.log("inside getRules");
  var serviceType = req.params.serviceType;
  var bandId = req.params.bandId;
  var exp = req.params.exp;
  rule.getRules(serviceType, bandId, exp, function (err, data) {
    console.log(err);
    console.log(data);
    res.json(data);
  });
});

router.post('/', function (req, res) {
  var body = req.body;
  if (body) {
    rule.createRule(body.band, body.experience, body.serviceType, body.rule.path, body.rule.value, body.priority, function (err, data) {
      console.log(data);
      res.json(data);
    });
  }

  else
    res.send("no value for body");
});


router.post('/deleteRule', function (req, res) {
  console.log(req.body.id);
  console.log("in delete");
  var id = req.body.id;

  rule.deleteRule(id, function (err) {
    if (err) console.log(err);
    res.json({ msg: "deleted" });
  });
});

router.post('/modifyRule', function (req, res) {

  var object = req.body.ruleObject;
  //var id=req.body.id;
  console.log(object);
  console.log("in modify");
  rule.modifyRule(object._id, object, function (err, data) {
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
