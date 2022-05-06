import React from 'react';
import Cookies from 'js-cookie';
import SpotifyLogo from '../../server/public/assets/spotify.png';

export default class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRange: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.id === 'six-months') {
      fetch('/api/artists6months')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: '6 months',
            artist: userInfo
          });
        });
    } else if (event.target.id === 'one-month') {
      fetch('/api/artists1month')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: '1 month',
            artist: userInfo
          });
        });
    } else {
      fetch('/api/artistsalltime')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: 'all-time',
            artist: userInfo
          });
        });
    }
  }

  componentDidMount() {
    fetch('/api/artistsalltime')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({
          timeRange: 'all-time',
          artist: userInfo
        });
      });
  }

  render() {
    if (this.state.artist === undefined) {
      return null;
    }

    const artistList = this.state.artist.map(index => {
      const artistURL = 'https://open.spotify.com/artist/' + index.artistId;
      return (
        <div key={index.id} className='column-one-half-row padding-right'>
          <div className='row padding-top'>
            <div className='column-one-half align-baseline'>
              <img className='artist-cover' src={index.image} />
            </div>
            <div className='column-one-half'>
              <a href={artistURL} className='track-info track-name'>{index.artist}</a>
              <p className='track-info'>Genre: {index.genre}</p>
              <p className='track-info'>Popularity: {index.popularity}</p>
            </div>
          </div>
        </div>
      );
    });

    const header = (
      <div id="header-container">
        <img id="spotify-logo" src={SpotifyLogo} alt="Spotify" />
        <div id="header">TOP ARTISTS</div>
        <div id="message">Hi {Cookies.get('displayName')}, here are your top artists of {this.state.timeRange}.</div>
      </div>);

    if (this.state.timeRange === '6 months') {
      return (
        <div className='home-container padding-bottom'>
          {header}
          <div id="time-container" className='padding-top'>
            <div className='column-one-third padding-left'>
              <div id="all-time" className="time-range" onClick={this.handleClick}>All-Time</div>
            </div>
            <div className='column-one-third'>
              <div id="six-months" className="time-range green" onClick={this.handleClick}>6 Months</div>
            </div>
            <div className='column-one-third padding-right'>
              <div id="one-month" className="time-range" onClick={this.handleClick}>1 Month </div>
            </div>
          </div>
          <div id="tracks-container">{artistList}
          </div>
        </div>
      );
    } else if (this.state.timeRange === '1 month') {
      return (
        <div className='home-container padding-bottom'>
          {header}
          <div id="time-container" className='padding-top'>
            <div className='column-one-third padding-left'>
              <div id="all-time" className="time-range" onClick={this.handleClick}>All-Time</div>
            </div>
            <div className='column-one-third'>
              <div id="six-months" className="time-range" onClick={this.handleClick}>6 Months</div>
            </div>
            <div className='column-one-third padding-right'>
              <div id="one-month" className="time-range green" onClick={this.handleClick}>1 Month </div>
            </div>
          </div>
          <div id="tracks-container">{artistList}
          </div>
        </div>
      );
    }
    return (
      <div className='home-container padding-bottom'>
        {header}
        <div id="time-container" className='padding-top'>
          <div className='column-one-third padding-left'>
            <div id="all-time" className="time-range green" onClick={this.handleClick}>All-Time</div>
          </div>
          <div className='column-one-third'>
            <div id="six-months" className="time-range" onClick={this.handleClick}>6 Months</div>
          </div>
          <div className='column-one-third padding-right'>
            <div id="one-month" className="time-range" onClick={this.handleClick}>1 Month </div>
          </div>
        </div>
        <div id="tracks-container">{artistList}
        </div>
      </div>
    );
  }
}
