const mongoose = require('mongoose');

const battleLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  victory: {
    type: Boolean,
    required: true
  },
  playerUnits: {
    soldiers: Number,
    tanks: Number,
    drones: Number
  },
  enemyUnits: {
    soldiers: Number,
    tanks: Number,
    drones: Number
  },
  coinsEarned: {
    type: Number,
    default: 0
  },
  playerLevel: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BattleLog', battleLogSchema);
