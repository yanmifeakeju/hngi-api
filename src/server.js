const express = require('express');
require('./db/moongose');
const userRouter = require('./routers/user');
const subscriptionRouter = require('./routers/subscription');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(userRouter);
app.use(subscriptionRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
