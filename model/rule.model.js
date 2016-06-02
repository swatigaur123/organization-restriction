var mongoose=require('mongoose');

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
  priority:'Number',
});

 module.exports = mongoose.model('rule',ruleSchema);
