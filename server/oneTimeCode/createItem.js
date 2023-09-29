import { Item } from "../models/items.js";
import { Category,Sub_Category } from "../models/category.js";
import { sequelize } from "../models/index.js";

Category.hasMany(Item);
Item.belongsTo(Category);
Sub_Category.hasMany(Item);
Item.belongsTo(Sub_Category);
Category.hasMany(Sub_Category);
Sub_Category.belongsTo(Category);

let createItem = async function () {
    let item = await Item.create( {
            Description : "Category: Test3  SubCategory: Sub-Test32 3rd",
            Price: 12.03,
            Image_Link: "/img/items/079.png"
        });
    let category = await Category.findOne({
            where: {
                Name: "Test3",
            }
        });
    category.addItems(item);
// Model that "has many" .add Model that "belongs to" ; careful, table adds 's' to names of Model

    let subCategory = await Sub_Category.findOne({
            where: {
                Name: "Sub-Test32",
            }
        });
    subCategory.addItems(item);
    
}

let createCategory = function () {
    Category.create( {
        Name: "Test3",
    })
}

let createSubCategory = async function () {
    let subCategory = await Sub_Category.create( {
        Name: "Sub-Test32",
    });
    let category = await Category.findOne({
        where: {
            Name: "Test3",
        }
    });
    category.addSubCategorys(subCategory);
}

sequelize.sync({/*force: true*/})
.then(() => createItem());