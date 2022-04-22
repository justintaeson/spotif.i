import React from 'react';
import Cookies from 'js-cookie';

export default class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      timeRange: null,
      clickedOn: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      displayName: null,
      timeRange: null,
      clickedOn: true
    });
  }

  componentDidMount() {
    fetch('/api/artistsalltime')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({
          displayName: null,
          timeRange: null,
          clickedOn: null,
          artist: userInfo
        });
      });
  }

  render() {
    if (this.state.artist === undefined) {
      return null;
    }

    const artistList = this.state.artist.map(index => {
      return (
        <div key={index.id} className='column-one-half-row padding-right'>
          <div className='row padding-top'>
            <div className='column-one-half align-baseline'>
              <img className='artist-cover' src={index.image} />
            </div>
            <div className='column-one-half'>
              <p className='track-info track-name'>{index.artist}</p>
              <p className='track-info'>Genre: {index.genre}</p>
              <p className='track-info'>Popularity: {index.popularity}</p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className='home-container padding-bottom'>
        <div id="header-container">
          <div id="header">TOP ARTISTS</div>
          <div id="message">Hi {Cookies.get('displayName')}, here are your top artists of all time.</div>
        </div>
        <div id="time-container" className='padding-top'>
          <div className='column-one-third padding-left'>
            <div className="time-range"> All Time </div>
          </div>
          <div className='column-one-third'>
            <div className="time-range"> 6 Months </div>
          </div>
          <div className='column-one-third padding-right'>
            <div className="time-range"> 1 Month </div>
          </div>
        </div>
        <div id="tracks-container">{artistList}
        </div>
      </div>
    );
  }
}
