import React from 'react';

export default function Login(props) {
  const clientId = 'bcaf96c9c8a246dbb00a2348debeb62c';
  const responseType = 'code';
  const redirectUri = 'http://localhost:3000/api/spotify-auth';
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('response_type', responseType);
  params.set('redirect_uri', redirectUri);

  return (
    <div id="login-background">
      <div id="logo">SPOTIF.I</div>
      <a href={'https://accounts.spotify.com/authorize?' + params} id="login-button">CONNECT</a>
      <video id="background-video" autoPlay loop muted>
        <source src="assets/background-video.mp4" type="video/mp4"/>
      </video>
    </div>
  );
}
