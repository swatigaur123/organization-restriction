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
    var rules = [];
    data.forEach(function(datum) {
      rules.push(datum.applicableRule)
    });
    res.json(rules);
  });
});

router.post('/', function (req, res) {
  var body = req.body;
  if (body) {
    console.log("printing body",body);
    rule.createRule(body.band, body.experience,body.applicableRule.serviceType,body.applicableRule.priority,body.applicableRule.rule.path,body.applicableRule.rule.action,body.applicableRule.rule.interpreterCategory, body.applicableRule.rule.value, function (err, data) {
      console.log(data);
      console.log(err);
      console.log("printing value",data.applicableRule.rule.value);
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
