import React from 'react';
import Home from './pages/home';
import Cookie from 'js-cookie';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorizing: true };
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
  }

  render() {
    if (this.state.isAuthorizing === true) {
      return null;
    }
    if (window.location.hash === '') {
      return <Home/>;
    }

    return null;

  }
}
