import React from 'react';

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      timeRange: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      displayName: null
    });
  }

  componentDidMount() {
    fetch('/api/me')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({
          user: userInfo
        });
      });
  }

  render() {
    return (
      <div id="home-container">
        <div id="header-container">
          <div id="header">TOP ARTISTS</div>
          <div id="message">Hi Justin, here are your top artists of all time.</div>
        </div>
        <div id="time-container">
          <div className='column-one-third'>
            <div className="time-range"> All Time </div>
          </div>
          <div className='column-one-third'>
            <div className="time-range"> 6 Months </div>
          </div>
          <div className='column-one-third'>
            <div className="time-range"> 1 Month </div>
          </div>
        </div>
        <div id="tracks-container">
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
          <div className='row'></div>
        </div>
        <div id="nav-bar">
          <div className="column-one-third">
            <i className="fa-solid fa-house icon"></i>
          </div>
          <div className="column-one-third">
            <i className="fa-solid fa-music icon"></i>
          </div>
          <div className="column-one-third">
            <i className="fa-solid fa-user-group icon"></i>
          </div>
        </div>
      </div>
    );
  }

}
