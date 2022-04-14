import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/me')
      .then(res => res.json())
      .then(userInfo =>
        this.setState({
          country: userInfo.country,
          displayName: userInfo.display_name,
          email: userInfo.email,
          followers: userInfo.followers.total,
          id: userInfo.id,
          profilePhoto: userInfo.images[0].url,
          subscription: userInfo.product
        })
      );
  }

  render() {
    return (
      <div id="home-container">
        <div id="header-container">
          <div id="header">PROFILE</div>
          <div id="message">Hi {this.state.displayName}, here is a quick snapshot of your Spotify account.</div>
        </div>
        <div id="data-container">
          <div className="column-one-half">
            <img id="circle" src={this.state.profilePhoto} alt="profile-photo"/>
            <div id="display-name">{this.state.displayName}</div>
          </div>
          <div className="column-one-half">
            <div className="info-container">
              <div>User ID: {this.state.id}</div>
              <div className="account-info">Email: {this.state.email}</div>
              <div className="account-info">Followers: {this.state.followers}</div>
              <div className="account-info">Status: {this.state.subscription}</div>
              <div className="account-info">Country: {this.state.country}</div>
            </div>
          </div>
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
