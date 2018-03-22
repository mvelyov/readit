'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 20],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'http://www.softicons.com/tv-movie-icons/iron2man-helmet-icons-by-svengraph',
      validate: {
        isUrl: true,
      },
    },
  }, {});
  user.associate = (models) => {
    // associations can be defined here
    const {
      post,
      comment,
    } = models;
    user.hasMany(post);
    user.hasMany(comment);
  };
  return user;
};
