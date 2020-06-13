const express = require('express');
require('./db/moongose');
const swaggerUI = require('swagger-ui-express');
const userRouter = require('./routers/user');
const subscriptionRouter = require('./routers/subscription');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/v1', userRouter);
app.use('/v1', subscriptionRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

// const Subscription = require('./models/subscription');
// const User = require('./models/user');

// const main = async () => {
//   // const subscription = await Subscription.findById('5ee39f4047e7f55350eeadc2');
//   // await subscription.populate('owner').execPopulate();
//   // console.log(subscription.owner);
//   const user = await User.findById('5ee39e3879dd7b1c4c313d97');
//   await user.populate('subs').execPopulate();

//   console.log(user.subs);
// };

// main();
