const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");

const { Item } = require("../back/database/models/item");
const sequelize = new Sequelize("inventorydb", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
});

app.use(cors());
app.use(express.json());

(async () => {
  await Item.sync({ force: false });
  console.log("Database synchronized for sure!");
})();

app.get("/inventories", async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

app.post("/inventories", async (req, res) => {
  const item = await Item.create({
    id : 1000 + Math.floor(Math.random() * 300000),
    name: req.body.name,
    price: req.body.price,
    location: req.body.location,
  });
  console.log(item.id);
  res.status(200).json({ success: true});

});

app.delete("/inventories/:inventoryId", async (req, res) => {
  await Item.destroy({
    where: {
      id: req.params.inventoryId
    },
  });
  res.status(200).json({ success: true});

});

app.listen(8080, () => {
  console.log("listening on post 8080");
});
