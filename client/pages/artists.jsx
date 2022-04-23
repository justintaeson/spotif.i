import React from 'react';
import Cookies from 'js-cookie';

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
      const allTimeFilter = document.querySelector('#all-time');
      const sixMonthsFilter = document.querySelector('#six-months');
      allTimeFilter.className = 'time-range';
      sixMonthsFilter.className = 'time-range green';
      fetch('/api/artists6months')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: '6 months',
            artist: userInfo
          });
        });
    } else {
      const allTimeFilter = document.querySelector('#all-time');
      const sixMonthsFilter = document.querySelector('#six-months');
      allTimeFilter.className = 'time-range green';
      sixMonthsFilter.className = 'time-range';
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
          <div id="header">TOP TRACKS</div>
          <div id="message">Hi {Cookies.get('displayName')}, here are your top artists of {this.state.timeRange}.</div>
        </div>
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
