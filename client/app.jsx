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
      isAuthorizing: true
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
      isAuthorizing: false
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
    } else if (window.location.hash === '#artists-page') {
      return (
        <>
          <Artists />
          <NavBar></NavBar>
        </>
      );
    } else if (window.location.hash === '#tracks-page') {
      return (
        <>
          <Tracks />
          <NavBar />
        </>
      );
    } else if (window.location.hash === '') {
      return (
      <>
        <Home />
        <NavBar />
      </>
      );
    } else {
      return null;
    }
  }
}
