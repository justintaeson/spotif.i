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

app.get('/api/spotify-auth', (req, res, next) => { // create a route to handle requests to the /api/spotify-auth
  const params = new URLSearchParams(); // create a new URLSearchParams object
  params.set('code', req.query.code); // set the code key to req code which should be
  params.set('grant_type', 'authorization_code'); // set the grant type to the authorization code
  params.set('redirect_uri', process.env.REDIRECT_URI); // set the redirect uri to the global environment variable REDIRECT_URI
  fetch('https://accounts.spotify.com/api/token?' + params, { //
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
  res.send('check the server terminal');

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
