import ItemRequest from "./item_array"
import { useState } from "react";
import DropDownMenu from "./drop_down_menu";

let ShoppingWindow = function () {

    let [category, setCategory] = useState('All');
    let [subCategory, setSubCategory] = useState('All');

    let searchCategory = function(word) {setCategory(word)};

    return(
        <>
        <DropDownMenu searchCategory={searchCategory}/>
        <ItemRequest category={category} subCategory={subCategory}/>
        </>
        )
}

export default ShoppingWindow;