import ItemRequest from "./item_array"
import { useState } from "react";
import DropDownMenu from "./drop_down_menu";

let ShoppingWindow = function () {

    let [masterCategory, setMasterCategory] = useState('All');
    let [category, setCategory] = useState('All');
    let [subCategory, setSubCategory] = useState('All');

    let searchCategory = function(word,subword) {setCategory(word); setSubCategory(subword)};

    return(
        <>
        <DropDownMenu setMasterCategory={setMasterCategory} setCategory={setCategory} setSubCategory={setSubCategory}/>
        <ItemRequest masterCategory={masterCategory} category={category} subCategory={subCategory}/>
        </>
        )
}

export default ShoppingWindow;