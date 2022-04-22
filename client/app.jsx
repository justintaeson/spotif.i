import React from 'react';
import Home from './pages/home';
import Tracks from './pages/tracks';
import Cookie from 'js-cookie';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      clickedOn: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.className === 'fa-solid fa-music icon') {
      window.location.hash = 'tracks-page';
      this.setState({
        isAuthorizing: false,
        clickedOn: 'tracks-page'
      });
    }

    if (event.target.className === 'fa-solid fa-house icon') {
      window.location.hash = '';
      this.setState({
        isAuthorizing: false,
        clickedOn: 'home-page'
      });
    }
  }

  componentDidMount() {
    const accessToken = Cookie.get('access_token');
    if (accessToken === undefined) {
      const newUrl = new URL(window.location.href);
      newUrl.pathname = '/login.html';
      window.location = newUrl;
      return;
    }
    this.setState({
      isAuthorizing: false,
      clickedOn: null
    });
  }

  render() {
    if (this.state.isAuthorizing === true) {
      return null;
    }
    if (window.location.hash === '#tracks-page' || this.state.clickedOn === 'tracks-page') {
      return (
        <>
          <Tracks />
          <div id="nav-bar">
            <div className="column-one-third">
              <i className="fa-solid fa-house icon" onClick={this.handleClick}></i>
            </div>
            <div className="column-one-third">
              <i className="fa-solid fa-music icon"></i>
            </div>
            <div className="column-one-third">
              <i className="fa-solid fa-user-group icon"></i>
            </div>
          </div>
        </>
      );
    }
    if (window.location.hash === '' || this.state.clickedOn === 'home-page') {
      return (
      <>
        <Home />
        <div id="nav-bar">
          <div className="column-one-third">
            <i className="fa-solid fa-house icon"></i>
          </div>
          <div className="column-one-third">
              <i className="fa-solid fa-music icon" onClick={this.handleClick}></i>
          </div>
          <div className="column-one-third">
            <i className="fa-solid fa-user-group icon"></i>
          </div>
        </div>
      </>
      );
    }

    return null;

  }
}
