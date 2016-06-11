var mongoose = require('mongoose');

var ruleSchema = new mongoose.Schema({
  experience: [Number],
  band: [String],
  applicableRule: {
    serviceType: String,
    priority: Number,
    rule: {
      path: String,
      value: [String],
      interpreterCategory: String,
      action: String
    }
  }
});

ruleSchema.statics.getRules = function (serviceType, band, experience, cb) {
  var criteria = {
    band: band,
    experience: experience
  };
  if (serviceType) {
    criteria.serviceType = serviceType;
    this.find(criteria, cb);
  } else {
    this.find(criteria, cb);
  }
}

ruleSchema.statics.createRule = function (band, experience, serviceType, priority, path,action,interpreterCategory,value, cb) {
  console.log("printing cb  ",cb);
  this.create({
    band: band,
    experience: experience,
    serviceType: serviceType,
    applicableRule:{
      serviceType:serviceType,
      priority: priority,
      rule: {
        paths: path,
        value: value,
        interpreterCategory:interpreterCategory,
        action:action
      },
    },
  }, cb);

}

ruleSchema.statics.deleteRule = function (id, cb) {

  this.remove({ _id: id }, cb);
}

ruleSchema.statics.modifyRule = function (id, object, cb) {
  console.log(id);
  this.findByIdAndUpdate(id, object, { new: true }, cb);
}

module.exports = mongoose.model('rule', ruleSchema);
