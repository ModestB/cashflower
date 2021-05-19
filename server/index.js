const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routers/user');
const incomeRouter = require('./src/routers/income');
const incomeTypeRouter = require('./src/routers/incomeType');
const investmentRouter = require('./src/routers/investment');
const investmentGoalRouter = require('./src/routers/investmentGoal');
const investmentTypeRouter = require('./src/routers/investmentType');
const overviewRouter = require('./src/routers/overview');
const walletRouter = require('./src/routers/wallet');
const categoryRouter = require('./src/routers/category');
const transactionRouter = require('./src/routers/transaction');
const { port } = require('./config');
const { errorFormatter } = require('./src/utils/utils');

require('./src/db/mongoose');

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(incomeRouter);
app.use(incomeTypeRouter);
app.use(investmentRouter);
app.use(investmentGoalRouter);
app.use(investmentTypeRouter);
app.use(overviewRouter);
app.use(walletRouter);
app.use(categoryRouter);
app.use(transactionRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

app.use((err, req, res) => {
  res.status(500).send(errorFormatter({}, err.message));
});
