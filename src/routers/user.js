require('../db/moongose');
const User = require('../models/user');
const express = require('express');
const router = new express.Router();

router
  .post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send({ user });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
      const user = await User.findById(_id);
      if (!user) {
        res.status(404).send({ message: 'User does not exist' });
        return;
      }
      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
  });

module.exports = router;
