var express = require('express');
var router = express.Router();
var Rule = require('../model/rule.model.js');

router.get('/:serviceType/band/:bandId/exp/:exp',function(req,res){
  if(req.params.serviceType && req.params.bandId && req.params.exp) {
    console.log('Inside Get of rules');
    Rule.find({band: req.params.bandId, serviceType: req.params.serviceType, experience: req.params.exp},function(err,appliedRules) {
      if(err) return next(err);
      res.json(appliedRules);
    });
  } else {
    //type of status code has to be decided. Not sure ...
    res.status(400).end();
  }
});


router.post('/', function(req,res) {
  if(req.body) {
    console.log("inside post");
    var rule= new Rule({
      band:req.body.band,
      experience:req.body.experience,
      serviceType:req.body.serviceType,
      rule: {
        path: req.body.rule.path,
        value: req.body.rule.value
      },
      priority: req.body.priority
    });
    rule.save(function(err,savedRule){
      res.json(savedRule);
    });
  }
});

module.exports = router;
