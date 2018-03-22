'use strict';
module.exports = (sequelize, DataTypes) => {
  const subreadit = sequelize.define('subreadit', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  subreadit.associate = (models) => {
    // associations can be defined here
    const {
      post,
    } = models;
    subreadit.hasMany(post);
  };
  return subreadit;
};
