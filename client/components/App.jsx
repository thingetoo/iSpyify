import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: []
    }
  }

  componentDidMount() {
    axios.get('/categories')
    .then(response => console.log(response.data))

    axios.post('/artist', {artist: 'Drake'}) // hardcoded
    .then(response => response.data)
    .then((info) => {
      const artistId = info.artists.items[0].id;
      axios.post('/tracks', {artistId})
      .then(response => {
        let num = Math.floor(Math.random() * response.data.tracks.length);
        while (response.data.tracks[num].album.album_type === 'single') {
          num = Math.floor(Math.random() * response.data.tracks.length)
        }
        const albumName = response.data.tracks[num].album.name;
        console.log(albumName)
        console.log(response.data.tracks)
        const albumid = response.data.tracks[num].album.id;
        axios.post('/album', {albumid})
        .then(response => console.log(response.data))
      })
    })
    // the flow is
  }

  render() {
    return (
      <div>
        <h1>Name that intro</h1>
      </div>
    )
  }
}

export default App;