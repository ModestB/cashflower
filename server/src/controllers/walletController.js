const Wallet = require('../models/wallet');
const { errorFormatter } = require('../utils/utils');

const WalletController = {

  create: async (req, res) => {
    const wallet = new Wallet({
      ...req.body,
      owner: req.user._id,
    });
    try {
      wallet.id = wallet._id;
      await wallet.save();

      res.send(wallet);
    } catch (error) {
      const msg = 'Wallet not valid!';
      res.status(500).send(errorFormatter(error, msg));
    }
  },

  readAll: async (req, res) => {
    try {
      await req.user.populate({
        path: 'wallets',
      }).execPopulate();
      res.send(req.user.wallets);
    } catch (error) {
      res.status(500).send(errorFormatter(error));
    }
  },

  update: async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'name',
      'balance',
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Not valid update';
      return res.status(400).send(errorFormatter({}, msg));
    }

    try {
      const wallet = await Wallet.findOne({ _id, owner: req.user._id });

      if (!wallet) {
        return res.status(404).send();
      }

      updates.forEach((update) => { wallet[update] = req.body[update]; });
      await wallet.save();

      res.send(wallet);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or wallet not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const wallet = await Wallet.findOneAndDelete({ _id, owner: req.user._id });

      if (!wallet) {
        const msg = 'Wallet not found!';
        return res.status(404).send(errorFormatter({}, msg));
      }

      res.send(wallet);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or income not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },
};

module.exports = WalletController;
