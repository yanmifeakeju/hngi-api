require('../db/moongose');
const Subscription = require('../models/subscription');
const express = require('express');
const router = new express.Router();

router
  .post('/subscription', async (req, res) => {
    const subscription = new Subsrcription(req.body);
    try {
      await subscription.save();
      res.status(201).send({ subscription });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/subscription', async (req, res) => {
    try {
      const subscription = await Subscription.find({});
      res.send(subscription);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .get('/subscription/:id', async (req, res) => {
    const _id = req.params.id;

    try {
      const subscription = await Subscription.findById(_id);
      if (!subscription) {
        res.status(404).send({ message: 'Subscription does not exist' });
        return;
      }
      res.send(subscription);
    } catch (error) {
      res.status(500).send();
    }
  });

module.exports = router;
