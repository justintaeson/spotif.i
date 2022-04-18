/*
- if the user doesn't have an access token - send them to the /#login page so they can sign in
- once they sign in, an access token will be given and stored as a cookie
- if there is an access token present, send them to the home page
-
*/

module.exports = function requireAuth(req, res, next) {
  if (req.url === '/login') {
    res.redirect('/login.html');
    return;
  }

  if (req.url === '/login.html') {
    if (req.cookies.access_token === undefined) {
      next();
    } else {
      res.redirect('/#');
    }
    return;
  }

  if (req.url === '/') {
    if (req.cookies.access_token !== undefined) {
      next();
    } else {
      res.redirect('/login.html');
    }
    return;
  }
  next();
};
