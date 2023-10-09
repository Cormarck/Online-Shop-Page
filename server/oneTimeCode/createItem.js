import { Item } from "../models/items.js";
import { Category,Master_Category,Sub_Category } from "../models/category.js";
import { sequelize } from "../models/index.js";

Category.hasMany(Item);
Item.belongsTo(Category);
Sub_Category.hasMany(Item);
Item.belongsTo(Sub_Category);
Category.hasMany(Sub_Category);
Sub_Category.belongsTo(Category);

Master_Category.hasMany(Item);
Master_Category.hasMany(Category);
Item.belongsTo(Master_Category);
Category.belongsTo(Master_Category);


let createItem = async function () {
    let item = await Item.create( {
            Description : "M: B C: 2 S: b #1",
            Price: 12.03,
            Image_Link: "/img/items/079.png"
        });/**/
    /*let item = await Item.findOne({
        where: {
            Description: "M: A C: 1 S: a #1",
        }
    });*/
    let masterCategory = await Master_Category.findOne({
            where: {
                Name: "Super-Mega-Ultimate-Category-Test",
            }
        });
    masterCategory.addItems(item);
    let category = await Category.findOne({
            where: {
                Name: "Test B2",
            }
        });
    category.addItems(item);
// Model that "has many" .add Model that "belongs to" ; careful, table adds 's' to names of Model

    let subCategory = await Sub_Category.findOne({
            where: {
                Name: "Sub-Test B2 b",
            }
        });
    subCategory.addItems(item);  
}

let createMasterCategory = function () {
    Master_Category.create({
        Name: "Super-Mega-Ultimate-Category-Test"
    })
}

let createCategory = async function () {
    let category = await Category.create( {
        Name: "Test B2",
    });
    let masterCategory = await Master_Category.findOne({
        where: {
            Name: "Super-Mega-Ultimate-Category-Test"
        }
    });
    masterCategory.addCategorys(category);
}

let createSubCategory = async function () {
    let subCategory = await Sub_Category.create( {
        Name: "Sub-Test B2 b",
    });
    let category = await Category.findOne({
        where: {
            Name: "Test B2",
        }
    });
    category.addSubCategorys(subCategory);
}

sequelize.sync({/*force: true*/})
/*.then(() => createMasterCategory());*/
/*.then(() => createCategory());*/
/*.then(() => createSubCategory());*/
.then(() => createItem());/**/