import React from 'react';

export default class Home extends React.Component {
  componentDidMount() {
    fetch('/api/me');
  }

  render() {
    return (
      <div id="home-container">
        <div id="header-container">
          <div id="header">PROFILE</div>
          <div id="message">Hi Justin, here is a quick snapshot of your Spotify account.</div>
        </div>
        <div id="data-container">
          <div className="column-one-half">
            <div id="circle"></div>
            <div id="display-name">JUSTIN SON</div>
          </div>
          <div className="column-one-half">
            <div className="info-container">
              <div className="">User ID: MRJUSTINSON</div>
              <div className="account-info">Email: justintaeson@gmail.com</div>
              <div className="account-info">Followers: 4</div>
              <div className="account-info">Status: Spotify Premium</div>
              <div className="account-info">Country: USA</div>
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
