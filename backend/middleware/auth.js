const isAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user");
  }
  next();
};

const isNotAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = {
  isAuthenticate,
  isNotAuthenticate,
};
