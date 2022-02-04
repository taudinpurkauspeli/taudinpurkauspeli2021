module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    group: {
      type: Sequelize.STRING,
    },
    studentid: {
      type: Sequelize.STRING,
      // unique: true,
    },
    mail: {
      type: Sequelize.STRING,
      allowNull: false,
      // unique: true,
    },
  });

  return User;
};
