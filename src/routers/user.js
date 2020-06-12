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
  .post('/users/login', async (req, res) => {
    try {
      const user = await User.findByCredentialss(
        req.body.email,
        req,
        body.password
      );
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: 'unable to login' });
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
  })
  .patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
      const user = await User.findById(req.params.id);
      updates.forEach((update) => (user[update] = req.body[update]));

      await user.save();

      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: 'request failed' });
    }
  })
  .delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(400).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
