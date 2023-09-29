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

// Category Setup
import {Category,Sub_Category} from "./models/category.js";

// paypal setup
import PAYPAL from "./js/paypal.js";
import { Item } from "./models/items.js";
const INTENT = PAYPAL.INTENT;
const CURRENCY = PAYPAL.CURRENCY;


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
        res.sendFile(path.join(__dirname,'build'/*,'index.html'*/));
});
// -------------------------------------------

// initialize DB ------------------------
sequelize.sync( )
.then(() => console.log("Tabelle erstellt"))/**/

// -------------------------------------------

// paypal specific requests -------------------

// GET_PAYPAL_ORDER_URL
/*SERVER.get("/getOrderURL", (req, res) =>{
    let url = PAYPAL.SDK_URL + "?client-id=" + PAYPAL.CLIENT_ID + "&enable-funding=venmo&currency=" + CURRENCY + "&intent=" + INTENT;
    res.json({url});
})*/

// GET_OPTIONS_OBJECT
SERVER.get("/getPaypalOptions", (req,res) => {
    const Options = {
        clientId: PAYPAL.CLIENT_ID,
        currency: CURRENCY,
        intent: INTENT,
    };

    res.send(Options);
})

// CREATE_ORDER_____
SERVER.post('/create_order', async (req,res) => {
    let shoppingCart = req.body.shoppingCartArray; //shoppingCart => [{id:1,amount:2},{id:2,amount:4},{id:3,amount:3},...]
    let currency_code = CURRENCY; // same as CC in url

    // create purchase Array
    let purchaseArray =[];
    let value;
    let getPurchaseList = async function () { // array needed for determine price
        shoppingCart.forEach( item => { // Switch für value; später aus DB holen
            
            switch (item.id) {
                    case 1:
                    value = 20.00;
                    break;

                    case 2:
                    value = 15.00;
                    break;

                    case 3:
                    value = 9.00;
                    break;

                    default:
                    value = 10.00;
                    break;
                }
            
            let i = 0;
            while (i < item.amount){
                // reference_id needed for more than one purchase
                // have to be unique
                purchaseArray.push(
                    {reference_id:  item.id + "_" + i,
                    amount: {
                                currency_code,
                                value,
                            }
                    });
                i++;
            }
        });       
    };

    await getPurchaseList();
    let order = await PAYPAL.createOrder(purchaseArray,INTENT);
    let id = order.id; // res for createOrder is already json
    res.send({id}); // Only ID of the Response is needed in the Browser!
})


// GET_PAYMENT______
// happens after the payment was approved and the popUp Window closes
SERVER.post('/complete_order', async (req,res) => {

    let orderID = req.body.orderID;
    let payment = await PAYPAL.capturePayment(orderID,INTENT);
    res.send(payment); // res from capturePayment is already json
})
//---------------------------------------------

SERVER.post('/get_items', async (req,res) => {
    let category = req.body.category;
    let subCategory = req.body.subCategory;

    let ItemArray = await Item.findAll({
        where: (category !== 'All') ? {categoryName : category} : {},
        raw:true,
        attributes: ["Id","subCategoryName","Description","Price","Image_Link"]

        // next add filter for sub category!
    })

    if (subCategory !== 'All') {
        let output = [];
        ItemArray.forEach((item) => {if (item.subCategoryName === subCategory) {output.push(item)}});
        ItemArray = output;
    }
    
    res.json(ItemArray);
} )

SERVER.get('/getCategorys', async (req,res) =>{
    let categoryArray = await Category.findAll ({
        raw: true,
        attributes: ["Name"]
    });
    res.json(categoryArray)
} )

SERVER.get('/getSubCategorys', async (req,res) => {
    let subCategoryArray = await Sub_Category.findAll ({
        raw: true,
        attributes:["Name","categoryName"],
    });
    res.json(subCategoryArray)
})

// Server Start -------------------------
SERVER.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));
//---------------------------------------