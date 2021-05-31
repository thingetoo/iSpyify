const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
require('dotenv').config();
const bodyParser = require('body-parser');

const toSpotify = require('./../spotify-api/to-spotify.js');
const score = require('./../db/scoring');

app.use(bodyParser());

app.use(express.static(path.join(__dirname, '..')));

// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTHSECRET,
//   baseURL: 'http://localhost:8080',
//   clientID: 'niWwdT55Tke7Sp3L8eMbjBgbxvGAGNqW',
//   issuerBaseURL: 'https://dev-46jomt77.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

app.get('/categories', (req, res) => {
  toSpotify.getCategories((data) => {
    res.json(data);
  });
});

app.post('/artist', (req, res) => {
  toSpotify.getArtist(req.body.artist, (result) => {
    res.json(result);
  });
});

app.post('/tracks', (req, res) => {
  toSpotify.getTopTracks(req.body.artistId, (result) => {
    res.json(result);
  });
});

app.post('/track', (req, res) => {
  toSpotify.getOneTrack(req.body.trackid, (result) => {
    res.json(result);
  });
});

app.get('/recommendations', (req, res) => {
  const song = req.query.songId;
  console.log(req.query);
  const artist = req.query.artistId;
  const genre = req.query.genreId;
  const seed = { song, artist, genre };
  toSpotify.getRecommendations(seed, (result) => {
    res.json(result);
  });
});

app.post('/add-score', (req, res) => {
  score.createScore(req.body, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.json(data);
    }
  });
});

app.get('/scores/:email', (req, res) => {
  score.getScore(req.params, (error, data) => {
    if (error) {
      console.log(error);
    }
    res.json(data);
  });
});

app.post('/update-score', (req, res) => {
  score.updateScore(req.body, (error, data) => {
    if (error) {
      console.log(error);
    }
    res.json(data);
  });
});

module.exports = app;
