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
