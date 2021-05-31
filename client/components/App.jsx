import React from 'react';
import axios from 'axios';
import Answers from './Answers.jsx';
import { auth, provider } from '../../firebase';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumId: '',
      time: 0,
      imageUrl: '',
      blur: 2,
      artistInput: 'Drake',
      genres: '',
      artistId: '',
      songId: '',
      arists: [],
      songSelections: [],
      timeRunning: false,
      username: '',
      score: 0,
      attempts: 0,
      screen: 'welcome',
      gameMode: 'easy',
      currentMode: 'Easy',
      pointsWorth: 1,
      fireUser: '',
      fireEmail: null,
    };
    this.onArtistSearchChange = this.onArtistSearchChange.bind(this);
    this.playSong = this.playSong.bind(this);
    this.playButton = React.createRef();
    this.getNextAlbum = this.getNextAlbum.bind(this);
    this.handleGetNextAlbumClick = this.handleGetNextAlbumClick.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.userExists = this.userExists.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { gameMode } = this.state;
    if (prevState.imageUrl !== this.state.imageUrl) {
      if (gameMode === 'easy') {
        this.setState({
          blur: 2,
          currentMode: 'Easy',
          pointsWorth: 1,
        });
      } else if (gameMode === 'medium') {
        this.setState({
          blur: 15,
          currentMode: 'Medium',
          pointsWorth: 3,
        });
      } else {
        this.setState({
          blur: 30,
          currentMode: 'Hard',
          pointsWorth: 9,
        });
      }
    }
  }

  signIn(e) {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        this.setState(
          {
            fireUser: payload.user.displayName,
            fireEmail: payload.user.email,
          },
          () => {
            this.userExists();
          }
        );
      })
      .catch((err) => console.log(err));
  }

  signOut() {
    auth.signOut().then(this.setState({ fireUser: null }));
  }

  updateScore() {
    const { fireEmail, score, attempts } = this.state;
    axios
      .post('/update-score', { fireEmail, score, attempts })
      .then((response) => {
        axios.get(`/scores/${this.state.fireEmail}`).then((res) => {
          this.setState({
            score: res.data.score,
            attempts: res.data.attempts,
          });
        });
      });
  }

  userExists() {
    axios.get(`/scores/${this.state.fireEmail}`).then((res) => {
      if (res.data === null) {
        this.addNewUser();
      } else {
        this.setState({
          score: res.data.score,
          attempts: res.data.attempts,
          screen: 'game',
        });
      }
    });
  }

  handleAnswerClick(data) {
    const { score, attempts, pointsWorth } = this.state;
    if (data.album.images[0].url === this.state.imageUrl) {
      this.setState({
        score: score + pointsWorth,
      });
    }
    this.setState(
      {
        attempts: attempts + 1,
      },
      () => {
        this.getRecommendations();
        this.updateScore();
      }
    );
  }

  addNewUser() {
    const { fireEmail, score, attempts } = this.state;
    axios
      .post('/add-score', { email: fireEmail, score, attempts })
      .then((res) => {
        this.setState({
          screen: 'game',
        });
      });
  }

  getRecommendations() {
    const { songId, artistId, genres } = this.state;
    axios
      .get(
        `/recommendations?songId=${songId}&artistId=${artistId}&genreId=${genres}`
      )
      .then((res) => {
        let num = Math.floor(Math.random() * res.data.tracks.length);
        let album_type = res.data.tracks[num].album.album_type;
        // while (album_type === 'single' || album_type === 'SINGLE') {
        //   num = Math.floor(Math.random() * res.data.tracks.length)
        // }
        const randomNums = [];
        while (randomNums.length < 4) {
          const rand = Math.floor(Math.random() * 10);
          if (randomNums.indexOf(rand) === -1) {
            randomNums.push(rand);
          }
        }
        const allSelections = [];

        for (let i = 0; i < randomNums.length; i++) {
          allSelections.push(res.data.tracks[randomNums[i]]);
        }
        const randFour = Math.floor(Math.random() * 4);
        const correctAlbum = allSelections[randFour].album;
        const imageUrl = correctAlbum.images[0].url;
        this.setState({
          imageUrl,
          songSelections: allSelections,
        });
      });
  }

  onArtistSearchChange(e) {
    this.setState({
      artistInput: e.target.value,
    });
  }

  playSong(e) {
    // const { timeRunning } = this.state
    // this.setState({
    //   timeRunning: true
    // })
    // this.timer = timeRunning && setInterval(() => {
    //   if (this.state.blur > 0) {
    //     this.setState({
    //       time: this.state.time + 1,
    //       blur: this.state.blur - 2
    //     })
    //   } else {
    //     this.setState({
    //       timeRunning: false
    //     })
    //   }
    // }, 1000)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGetNextAlbumClick() {
    this.getNextAlbum();
  }

  getNextAlbum() {
    axios
      .post('/artist', { artist: this.state.artistInput })
      .then((response) => response.data)
      .then((info) => {
        this.setState({
          artists: info.items,
        });
        const artistId = info.artists.items[0].id;
        const randomGenre = Math.floor(
          Math.random() * info.artists.items[0].genres.length
        );
        this.setState({
          genres: info.artists.items[0].genres[randomGenre],
          artistId,
        });
        axios.post('/tracks', { artistId }).then((response) => {
          let num = Math.floor(Math.random() * response.data.tracks.length);
          // while (response.data.tracks[num].album.album_type === 'single') {
          //   num = Math.floor(Math.random() * response.data.tracks.length)
          // }
          const album = response.data.tracks[num].album;
          const albumid = response.data.tracks[num].album.id;
          this.setState(
            {
              songId: response.data.tracks[num].id,
            },
            () => {
              this.getRecommendations();
            }
          );
        });
      });
  }

  componentDidMount() {
    axios.get('/categories').then((response) => console.log(response.data));
    this.getNextAlbum();
    // this.addNewUser()
    // this.userExists()
  }

  render() {
    const { screen, score, attempts, username, fireEmail } = this.state;
    if (screen === 'welcome') {
      return (
        <div className="welcome">
          <h1 className="heading">iSpyify: Albums</h1>
          <form className="form">
            <div className="sign-in-title">
              {this.state.fireEmail ? (
                <button onClick={(e) => this.signOut(e)}>Sign Out</button>
              ) : (
                <button onClick={this.signIn}>Sign In</button>
              )}
            </div>
            <div className="signin-inputs">
              <label>
                Username:
                <input
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  type="text"
                  name="username"
                />
              </label>
              <input className="login-submit" type="submit" value="Play" />
            </div>
          </form>
          <div>
            <span>Powered by the Spotify Web API</span>
          </div>
        </div>
      );
    } else if (screen === 'game') {
      return (
        <div className="main-container">
          <div id="header">
            <div className="score-digits">
              <div className="game-numbers">
                <label>
                  <span>{fireEmail}</span>
                </label>
                <label>
                  Score:
                  <span>{score}</span>
                </label>
                <label>
                  Attempts:
                  <span>{attempts}</span>
                </label>
              </div>
              <div className="mode">
                <select name="gameMode" onChange={this.handleInputChange}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <span>Current Mode: {this.state.currentMode}</span>
              </div>
            </div>
          </div>
          <div className="main-container">
            {/* {
              this.state.albumId && <div onClick={this.playSong}><iframe ref={this.playButton} onMouseOver={this.playSong} src={`https://open.spotify.com/embed/album/${this.state.albumId}`} width="18" height="18" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
            } */}
            <h1 className="heading">iSpyify: Albums</h1>
            <div className="artist-search">
              <input
                type="text"
                onChange={(e) => this.onArtistSearchChange(e)}
              ></input>
              <button
                className="artistSearch"
                onClick={this.handleGetNextAlbumClick}
              >
                Search Artist
              </button>
            </div>
            <span>{this.state.time}</span>
            <div
              onClick={this.playSong}
              className="image-container"
              style={{ backgroundColor: 'black', width: 'fit-content' }}
            >
              <img
                className="album-image"
                style={{ filter: `blur(${this.state.blur}px)` }}
                src={this.state.imageUrl}
              ></img>
            </div>
            <Answers
              handleClick={this.handleAnswerClick}
              songs={this.state.songSelections}
            />
          </div>
          <span className="footer">
            Developed by Brandon Galloway |{' '}
            <a href="https://www.linkedin.com/in/brandon-galloway-5211b9b7/">
              Hire me
            </a>
          </span>
        </div>
      );
    }
  }
}

export default App;
