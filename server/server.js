// Server Set Up -----------------------------
import express from "express";
// Sequelize Setup
import {sequelize} from "./models/index.js";
// Sequelize Operators
import { Op } from "sequelize";
// for reading .env file
import "dotenv/config";

//important for __filename and __dirname
import path from 'path';
import {fileURLToPath} from 'url';
// ------------------------------------------------------------------

const SERVER = express();
const IP = process.env.IP;
const PORT = process.env.PORT

SERVER.use(express.static("build")); // for Roll Out
SERVER.use(express.json());

// for using __filename and __dirname,within an ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// fixes routing problem after running build
// 'sendFile' not 'send' !!!
SERVER.use(express.static(path.join(__dirname, "build")));
SERVER.get('/*',function(req,res) {
        res.sendFile(path.join(__dirname,'build','index.html'));
});
// -------------------------------------------

// initialize DB ------------------------
sequelize.sync( )
.then(() => console.log("Tabelle erstellt"))/**/

// -------------------------------------------


// Server Start -------------------------
SERVER.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));
//---------------------------------------