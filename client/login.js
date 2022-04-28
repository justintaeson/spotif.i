const clientId = process.env.CLIENT_ID;
const responseType = 'code';
const redirectUri = process.env.REDIRECT_URI;
const scope = 'user-read-email user-top-read user-read-private';
const params = new URLSearchParams();
params.set('client_id', clientId);
params.set('response_type', responseType);
params.set('redirect_uri', redirectUri);
params.set('scope', scope);

const anchorTag = document.querySelector('#login-button');
anchorTag.setAttribute('href', 'https://accounts.spotify.com/authorize?' + params);
