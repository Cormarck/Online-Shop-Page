import { useState } from "react";

// get -> all categorys
    // create dropdown with all categorys
    let categoryArray = []; // has Names of all Categorys
    let getCategorys = async function () {
        let res = await fetch('/getCategorys', {
            method: "get",
        });
    let categorys = await res.json();
    // res is array of categorys
    categorys.forEach(item => {categoryArray.push(item.Name) });
    }
    await getCategorys();
    // categoryAttay = [Test, Test2, Test3]

    // - - -
    // get all sub categorys
    // create dropdown with all subcategorys of category
    let subCategoryArray = []; // has Objects with Names of all Sub_Categorys AND respective Categorys
    let getSubCategorys = async function (category) {
        let res = await fetch('/getSubCategorys', {
            method: "get",
        });
    subCategoryArray = await res.json();
    }
    await getSubCategorys();
    // subCategoryArray = [{Name: Sub-Test, categoryName: Test}, {Name: Sub-Test2, categoryName: Test2}, {Name: Sub-Test21, categoryName: Test2}, {Name: Sub-Test3, categoryName: Test3}, {Name: Sub-Test31, categoryName: Test3}, {Name: Sub-Test32, categoryName: Test3}]


let DropDownMenu = function ({setCategory,setSubCategory}) {

    let [word,setWord] = useState('Test');
    let subWord ='All'
    return (
        <div>
            <div className="categoryArray">{categoryArray}</div>
            <div className="subCategoryArray">sub-categorys</div>
            <div onClick={() => {setCategory('All'); setSubCategory('All')}}>All</div>
            <div onClick={() => {setCategory(word); setSubCategory(subWord)}}>Test Sub-Test</div>
        </div>
    )
}

export default DropDownMenu