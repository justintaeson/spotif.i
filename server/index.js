require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const requireAuth = require('./require-auth');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(requireAuth);
app.use(staticMiddleware);

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
  fetch('https://api.spotify.com/v1/me/', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(userInfo => {
      if (userInfo.error) {
        refreshToken();
      } else {
        res.cookie('displayName', userInfo.display_name);
        res.send({
          country: userInfo.country,
          displayName: userInfo.display_name,
          email: userInfo.email,
          followers: userInfo.followers.total,
          id: userInfo.id,
          profilePhoto: userInfo.images[0].url,
          subscription: userInfo.product
        });
      }
    })
    .catch(err => next(err));
}
);

app.get('/api/tracksalltime', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(topTracks => {
      const tracksArray = [];
      for (let i = 0; i < topTracks.items.length; i++) {
        tracksArray.push({
          id: i,
          artist: topTracks.items[i].artists[0].name,
          track: topTracks.items[i].name,
          image: topTracks.items[i].album.images[0].url,
          popularity: topTracks.items[i].popularity,
          trackId: topTracks.items[i].id
        });
      }
      res.send(tracksArray);
    });
});

app.get('/api/tracks6months', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(topTracks => {
      const tracksArray = [];
      for (let i = 0; i < topTracks.items.length; i++) {
        tracksArray.push({
          id: i,
          artist: topTracks.items[i].artists[0].name,
          track: topTracks.items[i].name,
          image: topTracks.items[i].album.images[0].url,
          popularity: topTracks.items[i].popularity,
          trackId: topTracks.items[i].id
        });
      }
      res.send(tracksArray);
    });
});

app.get('/api/tracks1month', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(topTracks => {
      const tracksArray = [];
      for (let i = 0; i < topTracks.items.length; i++) {
        tracksArray.push({
          id: i,
          artist: topTracks.items[i].artists[0].name,
          track: topTracks.items[i].name,
          image: topTracks.items[i].album.images[0].url,
          popularity: topTracks.items[i].popularity,
          trackId: topTracks.items[i].id
        });
      }
      res.send(tracksArray);
    });
});

app.get('/api/artistsalltime', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(topArtists => {
      const artistsArray = [];
      for (let i = 0; i < topArtists.items.length; i++) {
        artistsArray.push({
          id: i,
          artist: topArtists.items[i].name,
          popularity: topArtists.items[i].popularity,
          image: topArtists.items[i].images[0].url,
          genre: topArtists.items[i].genres[0],
          artistId: topArtists.items[i].id
        });
      }
      res.send(artistsArray);
    });
});

app.get('/api/artists6months', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(topArtists => {
      const artistsArray = [];
      for (let i = 0; i < topArtists.items.length; i++) {
        artistsArray.push({
          id: i,
          artist: topArtists.items[i].name,
          popularity: topArtists.items[i].popularity,
          image: topArtists.items[i].images[0].url,
          genre: topArtists.items[i].genres[0],
          artistId: topArtists.items[i].id
        });
      }
      res.send(artistsArray);
    });
});

app.get('/api/artists1month', refreshToken, (req, res, next) => {
  fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10', {
    headers: {
      Authorization: 'Bearer ' + req.user.access_token
    }
  })
    .then(res => res.json())
    .then(topArtists => {
      const artistsArray = [];
      for (let i = 0; i < topArtists.items.length; i++) {
        artistsArray.push({
          id: i,
          artist: topArtists.items[i].name,
          popularity: topArtists.items[i].popularity,
          image: topArtists.items[i].images[0].url,
          genre: topArtists.items[i].genres[0],
          artistId: topArtists.items[i].id
        });
      }
      res.send(artistsArray);
    });
});

function refreshToken(req, res, next) {
  const nowInSeconds = Date.now() / 1000;
  const expirationCheck = (nowInSeconds - req.cookies.issuedAt);
  if (expirationCheck > 3600) {
    const params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', req.cookies.refresh_token);
    fetch('https://accounts.spotify.com/api/token?' + params, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + spotifyBasicAuthEncoded
      }
    })
      .then(res => res.json())
      .then(newData => {
        if (newData.access_token === undefined) {
          res.clearCookie('access_token');
          res.clearCookie('expires_in');
          res.clearCookie('refresh_token');
          res.clearCookie('issuedAt');
          res.redirect('/#');
          next();
        }
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
