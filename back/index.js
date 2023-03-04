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
  await Item.sync({ force: false });
  console.log("Database synchronized for sure!");
})();

app.get("/items", async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

app.post("/item", async (req, res) => {
    const item = await Item.create({name:'New Item', price: '25', location: 'belgrad'});
    res.json(users);
  });

app.delete("/item/{id}", async (req, res) => {
  await User.destroy({
    where: {
      firstName: req.body.firstName
    }
  });
});

app.listen(8080, () => {
  console.log('listening on post 8080')
  }
);
