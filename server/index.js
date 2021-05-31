const app = require('./server.js');
const mongodb = require('mongodb');
const request = require('request');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;

const { Schema } = mongoose;

mongoose.connect(
  process.env.ISPYIFY_DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true
  }
)
  .catch(err => {
  throw err;
  })
  .then(async client => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
