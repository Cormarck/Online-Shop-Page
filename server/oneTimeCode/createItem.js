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
            Description : "M: A C: 2 S: a #1",
            Price: 12.03,
        });
    //
    let masterCategory = await Master_Category.findOne({
            where: {
                Id: "1",
            }
        });
    masterCategory.addItems(item);
    //
    let category = await Category.findOne({
            where: {
                Id: "3",
            }
        });
    category.addItems(item);
    // Model that "has many" .add Model that "belongs to" ; careful, table adds 's' to names of Model
    let subCategory = await Sub_Category.findOne({
            where: {
                Id:"4",
            }
        });
    subCategory.addItems(item);  
}

let createMasterCategory = function () {
    Master_Category.create({
        Name: /*"Super-Uber-Duper-Category"*/"Super-Mega-Ultimate-Category"
    })
}

let createCategory = async function () {
    let category = await Category.create( {
        Name: "Test B2",
    });
    let masterCategory = await Master_Category.findOne({
        where: {
            Id: "2"
        }
    });
    masterCategory.addCategorys(category);
}

let createSubCategory = async function () {
    let subCategory = await Sub_Category.create( {
        Name: "Sub A2b",
    });
    let category = await Category.findOne({
        where: {
            Id: "3",
        }
    });
    category.addSubCategorys(subCategory);
}

sequelize.sync(/*{force: true}*/)
/*.then(() => createMasterCategory());*/
/*.then(() => createCategory());*/
/*.then(() => createSubCategory());*/
.then(() => createItem());/**/