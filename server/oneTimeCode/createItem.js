import { Item } from "../models/items.js";
import { sequelize } from "../models/index.js";

let createItem = function () {
    Item.create( {
        test: "a",
    }
    )
}

sequelize.sync()
.then(() => createItem());