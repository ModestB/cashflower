const mongoose = require('mongoose');
const { databaseUrl, databaseName } = require('../../config');

const db = mongoose.connection;

mongoose.connect(`${databaseUrl}/${databaseName}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.once('open', () => {
  console.log('Database connected:', `${databaseUrl}/${databaseName}`);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});
