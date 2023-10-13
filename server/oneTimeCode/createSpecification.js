import { Item,Item_Specification } from "../models/items.js";
import { Category,Master_Category,Sub_Category } from "../models/category.js";
import { sequelize } from "../models/index.js";

let createSpecification = async function () {
    let item = await Item.findOne ({
        where: {
            Id: "1",
        }
    });

    let specification = await Item_Specification.findOne ({
        where: {
            id: "1",
        }
    })

    /*
    let specification = await Item_Specification.create ({
        Image_Link: "079.png",
        Amount:50,
        Color:"pink",
        Size:"XXL",
    });*/
    item.addItemSpecifications(specification);
}

sequelize.sync()
.then(()=> createSpecification());