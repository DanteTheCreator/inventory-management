const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('inventorydb', 'postgres', '' , {
  host: 'localhost',
  dialect: 'postgres',
});

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  }
});

module.exports = { Item };



