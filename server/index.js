const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
require('dotenv').config();
const toSpotify = require('./../spotify-api/to-spotify.js')
const bodyParser = require('body-parser');

app.use(bodyParser())

const port = 8080;

app.use(express.static(path.join(__dirname, '..')));

app.get('/categories', (req, res) => {
  toSpotify.getCategories((data) => {
    res.json(data)
  })
})

app.post('/artist', (req, res) => {
  toSpotify.getArtist(req.body.artist, (result) => {
    res.json(result);
  })
})

app.post('/tracks', (req, res) => {
  toSpotify.getTopTracks(req.body.artistId, (result) => {
    res.json(result);
  })
})

app.post('/track', (req, res) => {
  toSpotify.getOneTrack(req.body.trackid, (result) => {
    res.json(result)
  })
})

app.post('/album', (req, res) => {
  toSpotify.getAlbum(req.body.albumid, result => {
    res.json(result)
  })
})

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});