import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Category,Master_Category,Sub_Category } from "./category.js";


export let Item = sequelize.define("items", {
    Id: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            autoIncrement: true,
            primaryKey: true,
          },
    Description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    Price: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },  
    },
    {
        timestamps:false
    }
);

/* Specifications depending on what product is sold */
export let Item_Specification = sequelize.define("itemSpecifications", {
    Image_Link: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    Amount: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },
    Color: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    Size: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    /* others like:
    Variant: {
            type: DataTypes.STRING,
            allowNull: false,
          },      
    Material: {
            type: DataTypes.STRING,
            allowNull: false,
          }, 
      usw. */
            
    },
    {
      timestamps:false
    }
);
    

Category.hasMany(Item);
Item.belongsTo(Category);
Sub_Category.hasMany(Item);
Item.belongsTo(Sub_Category);
Master_Category.hasMany(Item);
Item.belongsTo(Master_Category);

Item.hasMany(Item_Specification);
Item_Specification.belongsTo(Item);