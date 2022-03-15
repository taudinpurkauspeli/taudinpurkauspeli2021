const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('../models');

const User = db.users;

const createUser = async (req) => {
  const user = {
    user_name: req.headers.cn
      ? req.headers.cn
      : config.USER_NAME,
    group: req.headers.hygroupcn
      ? req.headers.hygroupcn
      : config.GROUP,
    studentid: req.headers.hypersonstudentid
      ? req.headers.hypersonstudentid
      : config.STUDENTID || '',
    mail: req.headers.mail
      ? req.headers.mail
      : config.MAIL,
  };

  let token;

  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    const [userFromDb, created] = await User.findOrCreate({
      where: {
        user_name: user.user_name,
        group: user.group,
        studentid: user.studentid,
        mail: user.mail,
      },
      defaults: {
        user_name: user.user_name,
        group: user.group,
        studentid: user.studentid,
        mail: user.mail,
      },
    });

    const userForToken = {
      username: userFromDb.user_name,
      id: userFromDb.id,
      group: userFromDb.group,
    };

    token = jwt.sign(userForToken, config.SECRET);
  }

  return { token, name: user.user_name, admin: user.group === config.ADMINGROUP };
};

exports.createUser = createUser;
