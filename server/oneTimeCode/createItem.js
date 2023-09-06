import { Item } from "../models/items.js";
import { sequelize } from "../models/index.js";

let createItem = function () {
    Item.create( {
        Category: "Test2",
        Sub_Category: "Sub-Test2",
        Description : " an other Item for testing purpose",
        Price: 12.03,
        Image_Link: "/img/items/079.png"
    }
    )
}

sequelize.sync({/*force: true*/})
.then(() => createItem());