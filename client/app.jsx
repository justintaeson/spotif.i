import React from 'react';
import Home from './pages/home';
import Login from './pages/login';

export default class App extends React.Component {

  render() {
    if (window.location.hash === '') {
      return <Home/>;
    }
    if (window.location.hash === '#login') {
      return <Login />;
    }

    return null;

  }
}
