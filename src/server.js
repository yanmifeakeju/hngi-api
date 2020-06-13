const express = require('express');
require('./db/moongose');
const swaggerUI = require('swagger-ui-express');
const userRouter = require('./routers/user');
const subscriptionRouter = require('./routers/subscription');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post('/', (req, res) => {
  res.send('Hello World');
});

app.use('/v1', userRouter);
app.use('/v1', subscriptionRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
