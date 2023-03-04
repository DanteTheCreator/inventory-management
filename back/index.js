const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require('sequelize');

const { Item } = require('../back/database/models/item');
const sequelize = new Sequelize('inventorydb', 'postgres', '' , {
  host: 'localhost',
  dialect: 'postgres',
});

app.use(cors());
app.use(express.json());

(async () => {
  await Item.sync({ force: true });
  console.log("Database synchronized for sure!");
})();

app.get("/items", async (req, res) => {
  const users = await Item.findAll();
  res.json(users);
});

app.post("/item", async (req, res) => {
    const users = await Item.findAll();
    res.json(users);
  });

app.delete("/item/{id}", async (req, res) => {
    const users = await Item.findAll();
    res.json(users);
  });

app.listen(8080, () => {
  console.log('listening on post 8080')
  }
);
