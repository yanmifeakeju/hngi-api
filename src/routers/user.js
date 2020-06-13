require('../db/moongose');
const User = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
// const { sendWelcomeEmail } = require('../emails/account');
const { sendCancelationEmail } = require('../emails/account');
const router = new express.Router();

router
  .post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      sendWelcomeEmail(user.email, user.name);
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post('/users/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (error) {
      res.status(400).send({ error: 'unable to login' });
    }
  })
  .post('/users/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );

      await req.user.save();

      res.send();
    } catch (error) {
      res.status(500).send();
    }
  })
  .post('/users/logoutall', auth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  })
  .get('/users/me', auth, async (req, res) => {
    res.send(req.user);
  })
  .patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send({ error: 'request failed' });
    }
  })
  .delete('/users/me', auth, async (req, res) => {
    try {
      // const user = await User.findByIdAndDelete(req.user._id);

      // if (!user) {
      //   return res.status(400).send();
      // }
      await req.user.remove();
      // sendCancelationEmail(req.user.email, req.user.name);
      res.send(req.user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
