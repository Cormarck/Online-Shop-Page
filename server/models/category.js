import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export let Master_Category = sequelize.define("masterCategorys", {
    Id: {
        type: DataTypes.INTEGER,
        allowNull:  false,
        autoIncrement: true,
        primaryKey: true,
      },
    Name: {
        type: DataTypes.STRING,
            allowNull: false,
    }
},
{
    timestamps:false
}
)

export let Category = sequelize.define("categorys", {
    Id: {
        type: DataTypes.INTEGER,
        allowNull:  false,
        autoIncrement: true,
        primaryKey: true,
      },
    Name: {
        type: DataTypes.STRING,
            allowNull:  false,
    }
},
{
    timestamps:false
}
)

export let Sub_Category = sequelize.define("subCategorys", {
    Id: {
        type: DataTypes.INTEGER,
        allowNull:  false,
        autoIncrement: true,
        primaryKey: true,
      },
    Name: {
        type: DataTypes.STRING,
            allowNull:  false,
    }
},
{
    timestamps:false
}
)


Category.hasMany(Sub_Category);
Sub_Category.belongsTo(Category);
Master_Category.hasMany(Category);
Category.belongsTo(Master_Category);