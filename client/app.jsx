import React from 'react';
import Home from './pages/home';
import Tracks from './pages/tracks';
import Artists from './pages/artists';
import Cookie from 'js-cookie';
import NavBar from './navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      clickedOn: null
    };
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
    window.addEventListener('hashchange', () => {
      this.setState({
        isAuthorizing: false,
        clickedOn: window.location.hash
      });
    });
  }

  render() {
    if (this.state.isAuthorizing === true) {
      return null;
    }

    if (window.location.hash === '#artists-page' || this.state.clickedOn === 'artists-page') {
      return (
        <>
          <Artists />
          <NavBar></NavBar>
        </>
      );
    }

    if (window.location.hash === '#tracks-page' || this.state.clickedOn === 'tracks-page') {
      return (
        <>
          <Tracks />
          <NavBar />
        </>
      );
    }

    if (window.location.hash === '' || this.state.clickedOn === 'home-page') {
      return (
      <>
        <Home />
        <NavBar />
      </>
      );
    }

    return null;

  }
}
