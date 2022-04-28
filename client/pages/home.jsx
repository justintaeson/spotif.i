import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    fetch('/api/me')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({
          user: userInfo
        });
      }
      );
  }

  render() {
    if (this.state.user === null) {
      return null;
    }
    return (
      <div className='home-container'>
        <div id="header-container">
          <div id="header">PROFILE</div>
          <div id="message">Hi {this.state.user.displayName}, here is a quick snapshot of your Spotify account.</div>
        </div>
        <div id="data-container">
          <div id="profile" className="column-one-half align-center">
            <img id="circle" src={this.state.user.profilePhoto} alt="profile-photo"/>
            <div id="display-name">{this.state.user.displayName}</div>
          </div>
          <div id="user-info" className="column-one-half align-center">
            <div className="info-container">
              <div>User ID: {this.state.user.displayName}</div>
              <div className="account-info">Email: {this.state.user.email}</div>
              <div className="account-info">Followers: {this.state.user.followers}</div>
              <div className="account-info">Status: {this.state.user.subscription}</div>
              <div className="account-info">Country: {this.state.user.country}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
