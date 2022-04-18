import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Cookie from 'js-cookie';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorizing: true };
  }

  componentDidMount() {
    const accessToken = Cookie.get('access_token');
    if (accessToken === undefined) {
      window.location.hash = '#login';
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
    if (window.location.hash === '#login') {
      return <Login />;
    }

    return null;

  }
}
