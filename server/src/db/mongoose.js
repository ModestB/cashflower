const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.once('open', () => {
  console.log('Database connected:', process.env.MONGODB_URL);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});
