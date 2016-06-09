var mongoose = require('mongoose');

var ruleSchema = new mongoose.Schema({
  experience: [Number],
  band: [String],
  serviceType: {
    type: 'String',
    required: true
  },
  rule: {
    path: 'String',
    value: 'String'
  },
  priority: 'Number',
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

ruleSchema.statics.createRule = function (band, experience, serviceType, path, value, priority, cb) {

  this.create({
    band: band,
    experience: experience,
    serviceType: serviceType,
    rule: {
      path: path,
      value: value
    },
    priority: priority
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