require('../db/moongose');
const Subscription = require('../models/subscription');
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router
  .post('/subscription', auth, async (req, res) => {
    // const subscription = new Subsrcription(req.body);
    const subscription = new Subscription({
      ...req.body,
      owner: req.user._id,
    });
    try {
      await subscription.save();
      res.status(201).send({ subscription });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/subscription', auth, async (req, res) => {
    try {
      const subscription = await Subscription.find({ owner: req.user._id });

      res.send(subscription);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .get('/subscription/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
      //const subscription = await Subscription.findById(_id);
      const subscription = await Subscription.findOne({
        _id,
        owner: req.user._id,
      });
      if (!subscription) {
        res.status(404).send({ message: 'Subscription does not exist' });
        return;
      }
      res.send(subscription);
    } catch (error) {
      res.status(500).send();
    }
  })
  .patch('/subscription/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['plan'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
      const subscription = await Subscription.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!subscription) {
        return res.status(404).send();
      }
      subscription.plan = req.body.plan;
      subscription.save();

      res.send(subscription);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete('/subscription/:id', auth, async (req, res) => {
    try {
      const subscription = await Subscription.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id,
      });
      if (!subscription) {
        return res.status(404).send();
      }
      res.send(subscription);
    } catch (error) {
      res.status(500).send();
    }
  });

module.exports = router;
