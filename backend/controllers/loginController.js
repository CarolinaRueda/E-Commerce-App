const loginSuccess = (req, res) => {
  res.json(req.user);
};

module.exports = { loginSuccess };
