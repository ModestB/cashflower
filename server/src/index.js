const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const incomeRouter = require('./routers/income');
const incomeTypeRouter = require('./routers/incomeType');
const { errorFormatter } = require('./helpers/utils');

const port = process.env.SERVER_PORT;
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(incomeRouter);
app.use(incomeTypeRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

app.use((err, req, res) => {
  res.status(500).send(errorFormatter({}, err.message));
});
