const User = require('../models/user');
const express = require('express');
const router = new express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
