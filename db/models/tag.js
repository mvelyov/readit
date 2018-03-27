'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  tag.associate = (models) => {
    // associations can be defined here
  };
  return tag;
};
