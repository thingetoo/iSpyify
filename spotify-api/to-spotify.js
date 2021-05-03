const auth = require('./authorization.js')
const authOptions = auth.authOptions;
const request = require('request');
const axios = require('axios')

const baseUrl = 'https://api.spotify.com/v1'

module.exports = {
  getCategories: function(callback) {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `${baseUrl}/browse/categories`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          callback(body.categories.items)
        });
      }
    });
  },
  getArtist: function(artist, callback) {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `${baseUrl}/search?q=${artist}&type=artist`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          callback(body)
        });
      }
    });
  },
  getTopTracks: function(id, callback) {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `${baseUrl}/artists/${id}/top-tracks?country=GB`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          callback(body)
        });
      }
    });
  },
  getOneTrack: function(trackid, callback) {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `${baseUrl}/tracks/${trackid}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          callback(body)
        });
      }
    });
  },
  getAlbum: function(albumid, callback) {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `https://api.spotify.com/v1/recommendations`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          callback(body)
        });
      }
    });
  }
}