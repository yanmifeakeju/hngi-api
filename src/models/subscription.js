const mongoose = require('mongoose');

const subscriptionPlan = ['Basic', 'Standard', 'Premiun'];

const Subscription = mongoose.model('Subscription', {
  plan: {
    type: String,
    required: true,
    validate(value) {
      if (subscriptionPlan.indexOf(value) > 0) {
        throw new Error('This plan does not exist');
      }
    },
  },
  created: {},
  expired: {},
});

module.exports = Subscription;
