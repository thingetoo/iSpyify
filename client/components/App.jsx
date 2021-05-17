import React from 'react';
import axios from 'axios';
import Answers from './Answers.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      albumId: '',
      time: 0,
      albumUrl: '',
      blur: 45,
      artistInput: 'Drake',
      genres: '',
      artistId: '',
      songId: '',
      arists: [],
      songSelections: [],
      timeRunning: false
    }
    this.onArtistSearchChange = this.onArtistSearchChange.bind(this);
    this.playSong = this.playSong.bind(this);
    this.playButton = React.createRef();
    this.getNextAlbum = this.getNextAlbum.bind(this);
    this.handleGetNextAlbumClick = this.handleGetNextAlbumClick.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('In componentDidUpdate')
    if (this.state.blur === 0) {
      stopInterval
    }
  }

  getRecommendations() {
    const { songId, artistId, genres } = this.state;
    console.log('Before the get recommendations response')
    axios.get(`/recommendations?songId=${songId}&artistId=${artistId}&genreId=${genres}`)
    .then(res => {
      console.log(res.data, 'In the get recommendations response')
      let num = Math.floor(Math.random() * res.data.tracks.length);
      let album_type = res.data.tracks[num].album.album_type
        // while (album_type === 'single' || album_type === 'SINGLE') {
        //   console.log('in while loop')
        //   num = Math.floor(Math.random() * res.data.tracks.length)
        // }
        const randomNums = []
        while (randomNums.length < 4) {
          const rand = Math.floor(Math.random() * 10)
          if (randomNums.indexOf(rand) === -1) {
            randomNums.push(rand)
          }
        }
        const allSelections = [];

        for (let i = 0; i < randomNums.length; i++) {
          allSelections.push(res.data.tracks[randomNums[i]])
        }
        const randFour = Math.floor(Math.random() * 4)
        const correctAlbum = allSelections[randFour].album
        console.log(correctAlbum)
        console.log(correctAlbum)
        const imageUrl = correctAlbum.images[0].url;
        this.setState({
          imageUrl,
          songSelections: allSelections
        })
    })
  }

  onArtistSearchChange(e) {
    this.setState({
      artistInput: e.target.value,
    })
  }

  playSong(e) {
    const { timeRunning } = this.state
    console.log('in the playSong')
    this.setState({
      timeRunning: true
    })
    this.timer = timeRunning && setInterval(() => {
      if (this.state.blur > 0) {
        this.setState({
          time: this.state.time + 1,
          blur: this.state.blur - 2
        }, () => {
          console.log(this.state.time)
        })
      } else {
        this.setState({
          timeRunning: false
        })
      }
    }, 1000)
  }

  componentWillUnmount() {

  }

  handleGetNextAlbumClick() {
    this.getNextAlbum()
    this.setState({
      blur: 35
    })
  }

  getNextAlbum() {
    axios.post('/artist', {artist: this.state.artistInput})
    .then(response => response.data)
    .then((info) => {
      console.log(info)
      this.setState({
        artists: info.items
      })
      const artistId = info.artists.items[0].id;
      const randomGenre = Math.floor(Math.random() * info.artists.items[0].genres.length)
      console.log(info.artists.items[0].genres[0])
      console.log(randomGenre)
      this.setState({
          genres: info.artists.items[0].genres[0],
          artistId
        })
        axios.post('/tracks', {artistId})
        .then(response => {
          console.log('in the response to the tracks request')
          let num = Math.floor(Math.random() * response.data.tracks.length);
          // while (response.data.tracks[num].album.album_type === 'single') {
          //   console.log('in while loop')
          //   num = Math.floor(Math.random() * response.data.tracks.length)
          // }
          const album = response.data.tracks[num].album
          console.log(response.data.tracks)
          const albumid = response.data.tracks[num].album.id;
          console.log(response.data.tracks[num].id)
          this.setState({
              songId: response.data.tracks[num].id
            }, () => { this.getRecommendations() })
        })
    })
  }

  componentDidMount() {
    axios.get('/categories')
    .then(response => console.log(response.data))
    console.log('before getnextAlbum function invocation in the componentDidMount')
    this.getNextAlbum();
    // the flow is
  }

  render() {
    return (
      <div className='main-container'>
        {/* {
          this.state.albumId && <div onClick={this.playSong}><iframe ref={this.playButton} onMouseOver={this.playSong} src={`https://open.spotify.com/embed/album/${this.state.albumId}`} width="18" height="18" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
        } */}
        <h1 className='heading'>iSpyify: Albums</h1>
        <div className='artist-search'>
          <input type='text' onChange={(e) => this.onArtistSearchChange(e)}></input>
          <button className='artistSearch' onClick={this.handleGetNextAlbumClick}>Search Artist</button>
        </div>
        <span>{this.state.time}</span>
        <div  onClick={this.playSong} className='image-container' style={{backgroundColor: 'black', width: 'fit-content'}}>
          <img className='album-image' style={{filter: `blur(${this.state.blur}px)`}} src={this.state.imageUrl}></img>
        </div>
        <Answers songs={this.state.songSelections} />
      </div>

    )
  }
}

export default App;