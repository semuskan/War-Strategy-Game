const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get player data
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Upgrade unit
router.post('/upgrade/:id', async (req, res) => {
  const { unit } = req.body;

  const user = await User.findById(req.params.id);

  if (user.stats.coins < 200)
    return res.status(400).json({ message: "Not enough coins" });

  user.army[unit]++;
  user.stats.coins -= 200;

  await user.save();
  res.json(user);
});

module.exports = router;
