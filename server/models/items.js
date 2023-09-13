import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export let Item = sequelize.define("items", {
    Id: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            autoIncrement: true,
            primaryKey: true,
          },
    /*Category: {
            type: DataTypes.STRING,
            allowNull:  false,
          },
    Sub_Category: {
            type: DataTypes.STRING,
            allowNull: false,
          },*/
    Description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    Price: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },
    Image_Link: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    /* additional adjustments ; in other List (Specifics)
    Color: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    Size: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    Material: {
      
    }
    */
    },
    {
        timestamps:false
    }
);