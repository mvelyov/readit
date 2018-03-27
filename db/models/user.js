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
      defaultValue: 'https://pbs.twimg.com/profile_images/624586699423612928/sWvLOJXY_400x400.jpg',
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
