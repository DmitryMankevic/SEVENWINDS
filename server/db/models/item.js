'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart, User }) {
      this.hasMany(Cart, { foreignKey: 'itemId' });
      this.belongsToMany(User, { through: Cart, foreignKey: 'itemId' });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Item',
    },
  );
  return Item;
};
