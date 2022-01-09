const User = require('../models/user');
const Token = require('../models/token');
const { errorFormatter } = require('../utils/utils');

const UserController = {

  // Create new user
  create: async (req, res) => {
    const user = new User(req.body);

    try {
      await user.save();
      const accessToken = await user.generateAuthToken();
      await user.generateDefaultIncomeTypes();
      await user.generateDefaultCategories();
      res.status(201).send({ user, accessToken });
    } catch (error) {
      let msg = '';
      let err = error;
      if (error.name === 'MongoError') {
        err = {};
        msg = 'Email already in use!';
      }
      res.status(400).send(errorFormatter(err, msg));
    }
  },

  // Read user profile
  read: async (req, res) => {
    try {
      const dataYears = await User.getDataDistinctYears(req.user);
      const wallets = await User.getUserWallets(req.user);
      const categories = await User.getUserCategories(req.user);
      await User.populateDataTypes(req.user);

      res.send({
        user: req.user,
        wallets,
        categories,
        dataYears,
        dataTypes: {
          income: req.user.incomeTypes,
          investment: req.user.investmentTypes,
        },
      });
    } catch (error) {
      res.status(500).send(errorFormatter(error));
    }
  },

  // Update user profile
  update: async (req, res) => {
    const user = { ...req.user };
    const updates = Object.keys(req.body);
    const alowedUpdates = [
      'username',
      'email',
      'password',
    ];
    const isValidOperation = updates.every((update) => alowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Invalid updates!';
      return res.status(400).send(errorFormatter({}, msg));
    }
    try {
      updates.forEach((update) => {
        user[update] = req.body[update];
      });

      await user.save();
      res.send({ user });
      return true;
    } catch (error) {
      res.status(500).send(errorFormatter(error));
      return false;
    }
  },

  // Delete user profile
  delete: async (req, res) => {
    try {
      await req.user.remove();
      res.send({ user: req.user });
    } catch (error) {
      res.status(500).send(errorFormatter());
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const accessToken = await user.generateAuthToken();
      // const dataYears = await User.getDataDistinctYears(user);
      // const wallets = await User.getUserWallets(user);
      // const categories = await User.getUserCategories(user);
      await User.populateDataTypes(user);

      res.send({
        user,
        accessToken,
      });
    } catch (error) {
      const msg = 'Login Failed! Check authentication credentials';
      res.status(400).send(errorFormatter({}, msg));
    }
  },

  logout: async (req, res) => {
    try {
      await Token.deleteOne({
        token: req.token,
        owner: req.user.id,
      });

      res.send();
    } catch (error) {
      res.status(500).send(errorFormatter({}));
    }
  },

  logoutAll: async (req, res) => {
    try {
      await Token.deleteMany({
        owner: req.user.id,
      });

      res.send();
    } catch (error) {
      res.status(500).send(errorFormatter({}));
    }
  },
};

module.exports = UserController;
