const mongoose = require('mongoose');
require('../db/moongose');

const subscriptionPlan = ['basic', 'standard', 'premium'];

const Subscription = mongoose.model('Subscription', {
  plan: {
    type: String,
    default: 'basic',
    validate(value) {
      if (subscriptionPlan.indexOf(value) === -1) {
        throw new Error('This plan does not exist');
      }
    },
  },
  created: {
    type: String,
    default: function () {
      const date = new Date().getFullYear();
      return date;
    },
  },
  expired: {
    type: String,
    default: function () {
      const date = new Date().getFullYear() + 1;
      let newDate = new Date(date.toString());

      newDate = newDate.getFullYear();
      return newDate;
    },
  },
});

// const subscribe = { plan: 'Standard' };

// const addSubscription = async () => {
//   const newsub = new Subscription(subscribe);
//   try {
//     await newsub.save();
//     console.log(newsub);
//   } catch (error) {
//     console.log(error);
//   }
// };

// addSubscription();

module.exports = Subscription;
