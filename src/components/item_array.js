import useFetch from "react-fetch-hook";
import ItemWindow from "./item_window";
import '../css/items.css';

let ItemRequest = function ({category,subCategory}) {
    let categoryObject = {
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
    // array is an array with objects
    console.log(array);
    let collection= [];
    array.forEach((item) => collection.push(<ItemWindow id={`Item_${item.Id}`} img_link={item.Image_Link} description={item.Description} price={item.Price}/>));
    return (
        <div className="itemArray">
            {collection}
        </div>
    )

    
}

export default ItemRequest