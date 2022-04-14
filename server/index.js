require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

const app = express();

app.use(staticMiddleware);
app.use(cookieParser());

const spotifyBasicAuth = process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET;
const spotifyBasicAuthEncoded = Buffer.from(spotifyBasicAuth).toString('base64');

app.get('/api/spotify-auth', (req, res, next) => {
  const params = new URLSearchParams();
  params.set('code', req.query.code);
  params.set('grant_type', 'authorization_code');
  params.set('redirect_uri', process.env.REDIRECT_URI);
  params.set('scope', 'user-read-email user-top-read user-read-private');
  fetch('https://accounts.spotify.com/api/token?' + params, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + spotifyBasicAuthEncoded
    }
  })
    .then(res => res.json())
    .then(auth => {
      res.cookie('access_token', auth.access_token);
      res.cookie('expires_in', auth.expires_in);
      res.cookie('refresh_token', auth.refresh_token);
      res.redirect('/#');
    })
    .catch(err => next(err));
});

app.get('/api/me', (req, res, next) => {
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer BQAG16GjYsf10m-7NA1TUmsPzQ1l8UHqNha7Tnz22ZGJebSarTbg6DabYW1eH-7Q0qYx3zeepSamo7pGlfFKQRkxHvFJ3yyspzEIkLSEtIqMayRaKIA5GUEpYXpfIX8XKIq8RP7R01GjIazaGIbOtMdtCeQCweoV0PHSAG6U',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(userInfo => {
      res.send(userInfo);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
