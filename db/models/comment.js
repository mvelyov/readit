'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  comment.associate = (models) => {
    // associations can be defined here
  };
  return comment;
};
