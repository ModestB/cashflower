const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const { errorFormatter } = require('../helpers/utils');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User
      .findOne({ _id: decoded._id })
      .select('-__v');

    const tokenExist = await Token
      .findOne({ token, owner: decoded._id });

    if (!user || !tokenExist) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send(
      errorFormatter(error, 'Not authorized to access this resource'),
    );
  }
};

module.exports = authMiddleware;
