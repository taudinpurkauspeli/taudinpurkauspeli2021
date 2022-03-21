/* eslint-disable consistent-return */
const fileRouter = require('express').Router();
const path = require('path');

// eslint-disable-next-line no-unused-vars
const middleware = require('../utils/middleware');

fileRouter.get('/:language', async (req, res) => {
  const { language } = req.params;
  // eslint-disable-next-line no-unused-vars

  const options = {
    root: path.join(__dirname),
  };

  // eslint-disable-next-line no-unused-vars
  const filename = language === 'en' ? 'PrivacyNotice.pdf' : 'Tietosuojailmoitus.pdf';
  res.sendFile(filename, options);
});

module.exports = fileRouter;
