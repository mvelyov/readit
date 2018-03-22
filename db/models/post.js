'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://i1.wp.com/www.totallyrank.com/wp-content/uploads/2017/06/boost.png?ssl=1',
      validate: {
        isUrl: true,
      },
    },
  }, {});
  post.associate = (models) => {
    // associations can be defined here
    const {
      comment,
      tag,
    } = models;
    post.hasMany(comment);
    post.belongsToMany(tag, {
      through: 'postsTags',
    });
    tag.belongsToMany(post, {
      through: 'postsTags',
    });
  };
  return post;
};
