import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const { Item } = require("./database/models/item");
const app: Express = express();
const cors = require("cors");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("inventorydb", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
});
/**
 * 
 * can easily add dummy data
 */

const addDummyData = (rows:number) => {
  const locationOptions = ['Main Office', 'Cavea Gallery', 'Cavea Tbilisi Mall', 'Cavea East Point', 'Cavea City Mall']
  const nameOptions = ['Movie', 'TV', 'DVD', 'CD', 'Screen', 'Couch']
  for (let i = 0; i <= rows; i++){
    Item.create({
      id: 1000 + Math.floor(Math.random() * 300000),
      name: nameOptions[Math.floor(Math.random()*nameOptions.length)],
      price: Math.floor(Math.random() * (10000 - 100 + 1) + 100),
      location: locationOptions[Math.floor(Math.random()*locationOptions.length)],
    });
  }
}


app.use(cors());
app.use(express.json());

(async () => {
  await Item.sync({ force: false });
  console.log("Database synchronized for sure!");
})();


// remove comment from below function to add however many rows of dummy data you want
// addDummyData(1500)

app.get("/inventories", async (req: Request, res: Response) => {
  const items = await Item.findAll();
  res.json(items);
});

app.get("/inventories/:location", async (req: Request, res: Response) => {
  const items = await Item.findAll({
    where: {
      location: req.params.location,
    },
  });
  res.json(items);
});

app.post("/inventories", async (req: Request, res: Response) => {
  const item = await Item.create({
    id: 1000 + Math.floor(Math.random() * 300000),
    name: req.body.name,
    price: req.body.price,
    location: req.body.location,
  });

  res.status(200).json({ success: true });
});

app.delete("/inventories/:inventoryId", async (req: Request, res: Response) => {
  await Item.destroy({
    where: {
      id: req.params.inventoryId,
    },
  });
  res.status(200).json({ success: true });
});

app.listen(8080, () => {
  console.log("listening on post 8080");
});
