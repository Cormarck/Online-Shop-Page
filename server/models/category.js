import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export let Master_Category = sequelize.define("masterCategorys", {
    Name: {
        type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
    }
},
{
    timestamps:false
}
)

export let Category = sequelize.define("categorys", {
    Name: {
        type: DataTypes.STRING,
            allowNull:  false,
            primaryKey: true,
    }
},
{
    timestamps:false
}
)

export let Sub_Category = sequelize.define("subCategorys", {
    Name: {
        type: DataTypes.STRING,
            allowNull:  false,
            primaryKey: true,
    }
},
{
    timestamps:false
}
)