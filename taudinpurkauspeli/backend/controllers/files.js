const fileRouter = require('express').Router();
const config = require('../utils/config');
const middleware = require('../utils/middleware');

fileRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  const options = {
    root: config.FILEPATH,
  };

  const filename = language === 'en' ? 'PrivacyNotice.pdf' : 'Tietosuojailmoitus.pdf';
  res.sendFile(filename, options);
});

module.exports = fileRouter;
