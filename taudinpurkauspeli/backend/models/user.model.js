module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    affiliation: {
      type: Sequelize.STRING,
      allowNull: false,
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
