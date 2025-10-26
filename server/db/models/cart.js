'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate({ User, Item }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Item, { foreignKey: 'itemId' });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
