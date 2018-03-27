'use strict';
module.exports = (sequelize, DataTypes) => {
  const subreadit = sequelize.define('subreadit', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    headerImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://www.freewebheaders.com/wordpress/wp-content/gallery/other-backgrounds/red-lonely-chair-website-header-design.jpg',
      validate: {
        isUrl: true,
      }
    }
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
