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
      const nowInSeconds = Date.now() / 1000;
      res.cookie('access_token', auth.access_token);
      res.cookie('expires_in', auth.expires_in);
      res.cookie('refresh_token', auth.refresh_token);
      res.cookie('issuedAt', nowInSeconds);
      res.redirect('/#');
    })
    .catch(err => next(err));
});

app.get('/api/me', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(userInfo => {
      res.send({
        country: userInfo.country,
        displayName: userInfo.display_name,
        email: userInfo.email,
        followers: userInfo.followers.total,
        id: userInfo.id,
        profilePhoto: userInfo.images[0].url,
        subscription: userInfo.product
      });
    })
    .catch(err => next(err));
}
);

function refreshToken(req, res, next) {
  const nowInSeconds = Date.now() / 1000;
  const expirationCheck = (nowInSeconds - req.cookies.issuedAt); // how do i access the issuedAt property in the authetnication process above?
  if (expirationCheck > 3600) {
    const params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', req.cookies.refresh_token); // how do i access the refresh_token that was given above as well?
    fetch('https://accounts.spotify.com/api/token?' + params, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + spotifyBasicAuthEncoded
      }
    })
      .then(res => res.json())
      .then(newData => {
        req.user = newData;
        const nowInSeconds = Date.now() / 1000;
        res.cookie('access_token', newData.access_token);
        res.cookie('expires_in', newData.expires_in);
        res.cookie('refresh_token', newData.refresh_token);
        res.cookie('issuedAt', nowInSeconds);
        next();
      })
      .catch(err => next(err));
  } else {
    req.user = req.cookies;
    next();
  }
}

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
