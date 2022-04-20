import React from 'react';

export default class Tracks extends React.Component {
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
    fetch('/api/tracksalltime')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({
          displayName: null,
          timeRange: null,
          clickedOn: null,
          track: userInfo
        });
      });
  }

  render() {
    if (this.state.track === undefined) {
      return null;
    }
    return (
      <div className='home-container'>
        <div id="header-container">
          <div id="header">TOP ARTISTS</div>
          <div id="message">Hi Justin, here are your top artists of all time.</div>
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
        <div id="tracks-container">
          <div className='row padding-top'>
            <div className='column-one-half-row padding-left'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key0.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name margin-none'>{this.state.track.key0.track}</p>
                <p className='track-info'>{this.state.track.key0.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key0.popularity}</p>
              </div>
            </div>
            <div className='column-one-half-row padding-right'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key1.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key1.track}</p>
                <p className='track-info'>{this.state.track.key1.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key1.popularity}</p>
              </div>
            </div>
          </div>
          <div className='row padding-top'>
            <div className='column-one-half-row padding-left'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key2.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key2.track}</p>
                <p className='track-info'>{this.state.track.key2.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key2.popularity}</p>
              </div>
            </div>
            <div className='column-one-half-row padding-right'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key3.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key3.track}</p>
                <p className='track-info'>{this.state.track.key3.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key3.popularity}</p>
              </div>
            </div>
          </div>
          <div className='row padding-top'>
            <div className='column-one-half-row padding-left'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key4.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key4.track}</p>
                <p className='track-info'>{this.state.track.key4.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key4.popularity}</p>
              </div>
            </div>
            <div className='column-one-half-row padding-right'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key5.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key5.track}</p>
                <p className='track-info'>{this.state.track.key5.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key5.popularity}</p>
              </div>
            </div>
          </div>
          <div className='row padding-top'>
            <div className='column-one-half-row padding-left'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key6.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key6.track}</p>
                <p className='track-info'>{this.state.track.key6.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key6.popularity}</p>
              </div>
            </div>
            <div className='column-one-half-row padding-right'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key7.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key7.track}</p>
                <p className='track-info'>{this.state.track.key7.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key7.popularity}</p>
              </div>
            </div>
          </div>
          <div className='row padding-top padding-bottom'>
            <div className='column-one-half-row padding-left'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key8.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key8.track}</p>
                <p className='track-info'>{this.state.track.key8.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key8.popularity}</p>
              </div>
            </div>
            <div className='column-one-half-row padding-right'>
              <div className='column-one-half align-center'>
                <img className='track-cover' src={this.state.track.key9.image} />
              </div>
              <div className='column-one-half'>
                <p className='track-info track-name'>{this.state.track.key9.track}</p>
                <p className='track-info'>{this.state.track.key9.artist}</p>
                <p className='track-info'>Popularity: {this.state.track.key9.popularity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
