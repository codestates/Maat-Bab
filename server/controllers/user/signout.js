module.exports = {
  post: (req, res) => {
    res.clearCookie('accessToken', { domain: 'maat-bab.com', path: '/' });
    res.clearCookie('refreshToken', { domain: 'maat-bab.com', path: '/' });
    return res.status(205).send('logout success');
  },
};
