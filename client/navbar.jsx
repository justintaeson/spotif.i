import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
    <div id = "nav-bar" >
      <div className="column-one-third">
        <a href="#">
          <i className="fa-solid fa-house icon"></i>
        </a>
      </div>
      <div className="column-one-third">
        <a href="#tracks-page">
          <i className="fa-solid fa-music icon"></i>
        </a>
      </div>
      <div className="column-one-third">
        <a href="#artists-page">
          <i className="fa-solid fa-user-group icon"></i>
        </a>
      </div>
    </div>
    );
  }
}
