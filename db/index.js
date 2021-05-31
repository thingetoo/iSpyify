const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoresSchema = new Schema({
  email: { type: String, required: true, unique: true },
  score: { type: Number },
  attempts: { type: Number },
});

const albumsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number },
  easy: { type: Number },
  medium: { type: Number },
  hard: { type: Number },
  correct: { type: Number },
});

const Scores = mongoose.model('Scores', scoresSchema);
const Albums = mongoose.model('Albums', albumsSchema);

module.exports = { Scores, Albums };
