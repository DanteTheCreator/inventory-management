const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('inventorydb', 'postgres', '' , {
  host: 'localhost',
  dialect: 'postgres',
});

const Item = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Item };