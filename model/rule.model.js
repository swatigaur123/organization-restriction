var mongoose = require('mongoose');

var ruleSchema = new mongoose.Schema({
  experience: [Number],
  band: [String],
  serviceType: String,
  rule: {
    path: String,
    value: String
  },
  priority:Number
});


ruleSchema.statics.getRules = function(serviceType,bandId,exp,cb){
  if( bandId && exp) {
    criteria={band:bandId,experience: exp};
    console.log('Inside Get of rules');
    console.log('rules for data given');
    if(serviceType)
    criteria.serviceType=serviceType;
    this.find(criteria,cb);
  } else {
    //type of status code has to be decided. Not sure ...
    //res.status(400).end();
    var error = new Error();
    error.status = 404;
    error.message = "Rule cannot be found"
    cb(error);
  }

}

ruleSchema.statics.createRule = function(band,experience,serviceType,path,value,priority,cb){

    this.create({
      band: band,
      experience: experience,
      serviceType: serviceType,
      rule: {
        path: path,
        value: value
      },
      priority: priority
    },cb);

  }

ruleSchema.statics.deleteRule = function(id,cb){

  this.remove({_id:id},cb);
}

ruleSchema.statics.modifyRule = function(id,object,cb){
  console.log(id);
  this.findByIdAndUpdate(id,object,{new: true},cb);
}

module.exports = mongoose.model('rule',ruleSchema);
