const express = require('express');
const router = express.Router();
const User = require('../models/User');
const BattleLog = require('../models/BattleLog');

function enemyWave(level) {
  const waves = {
    1: { soldiers: 8, tanks: 1, drones: 0 },
    2: { soldiers: 12, tanks: 2, drones: 1 },
    3: { soldiers: 15, tanks: 3, drones: 2 },
    4: { soldiers: 20, tanks: 4, drones: 3 },
    5: { soldiers: 25, tanks: 5, drones: 4 },
  };
  return waves[Math.min(level, 5)];
}

router.post('/start/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ enemy: enemyWave(user.stats.level) });
});

router.post('/result/:id', async (req, res) => {
  const { victory, playerUnits, enemyUnits, coinsEarned } = req.body;
  const user = await User.findById(req.params.id);

  user.stats.totalBattles++;
  if (victory) user.stats.wins++;
  else user.stats.losses++;

  user.stats.coins += coinsEarned;

  await user.save();

  const log = new BattleLog({
    userId: user._id,
    victory,
    playerUnits,
    enemyUnits,
    coinsEarned,
    playerLevel: user.stats.level
  });
  await log.save();

  res.json({ user, log });
});

module.exports = router;
