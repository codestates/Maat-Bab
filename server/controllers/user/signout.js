module.exports = {
  post: (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(205).send('logout success');
  },
};
