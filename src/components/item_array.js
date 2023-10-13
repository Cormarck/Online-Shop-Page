import useFetch from "react-fetch-hook";
import ItemWindow from "./item_window";
import '../css/items.css';

let ItemRequest = function ({masterCategory,category,subCategory}) {
    let categoryObject = {
        masterCategory,
        category,
        subCategory
    }

    const {isLoading, data} = useFetch('/get_items',
    {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(categoryObject),
    });
    return isLoading ?  (<div>Loading...</div>) : 
    (
       <ItemArray array={data}/>
    )
}

let ItemArray = function ({array}){
    console.log("return",array);
    // array is an array with objects
    let collection = [];

    // devide into sub specifications!

    array.forEach((item) => collection.push(<ItemWindow key={`Item_${item.Id}`} id={`Item_${item.Id}`} img_link={item.specificationArray.Image_Link} description={item.item.Description} price={item.item.Price}/>));
    return (
        <div className="itemArray">
            {collection}
        </div>
    )

    
}

export default ItemRequest