"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { Item } = require("./database/models/item");
const app = (0, express_1.default)();
const cors = require("cors");
/**
 * can easily add dummy data
 * uncomment call below if you need to add data
 */
const addDummyData = (rows) => __awaiter(void 0, void 0, void 0, function* () {
    const locationOptions = [
        "Main Office",
        "Cavea Gallery",
        "Cavea Tbilisi Mall",
        "Cavea East Point",
        "Cavea City Mall",
    ];
    const nameOptions = ["Movie", "TV", "DVD", "CD", "Screen", "Couch"];
    const items = yield Item.findAll();
    for (let i = 0; i <= rows; i++) {
        const id = 1000 + Math.floor(Math.random() * 300000000);
        if (id in items) {
        }
        else {
            Item.create({
                id,
                name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
                price: Math.floor(Math.random() * (10000 - 100 + 1) + 100),
                location: locationOptions[Math.floor(Math.random() * locationOptions.length)],
            });
        }
    }
});
app.use(cors());
app.use(express_1.default.json());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Item.sync({ force: false });
    console.log("Database synchronized for sure!");
}))();
// remove comment from below function to add however many rows of dummy data you want
// addDummyData(10000);
app.get("/inventories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield Item.findAll();
    res.json(items);
}));
app.get("/inventories/:location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield Item.findAll({
        where: {
            location: req.params.location,
        },
    });
    res.json(items);
}));
app.post("/inventories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield Item.create({
        id: 1000 + Math.floor(Math.random() * 300000),
        name: req.body.name,
        price: req.body.price,
        location: req.body.location,
    });
    res.status(200).json({ success: true });
}));
app.delete("/inventories/:inventoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item.destroy({
        where: {
            id: req.params.inventoryId,
        },
    });
    res.status(200).json({ success: true });
}));
app.listen(8080, () => {
    console.log("listening on post 8080");
});
