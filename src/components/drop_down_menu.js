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

    let [subCategoryDivArray,setSubCategoryDivArray] = useState([])

    // creates Array with buttons to select a sub category
    let filterSubCategory = function(filter) {
        let filteredArray = [];
        subCategoryArray.forEach(item => {if (item.categoryName === filter) {filteredArray.push(<div className="subCategory" key={item.Name} onClick={() => {setSubCategory(item.Name)}}>{item.Name}</div>)}});
        console.log(filteredArray);
        setSubCategoryDivArray([...filteredArray]);
    }

    // creates Array with buttons to select a category
    let categoryDivArray = [];
    categoryArray.forEach(item => {categoryDivArray.push(<div className="category" key={item} onClick={() => {setCategory(item); setSubCategory('All'); filterSubCategory(item)}}>{item}</div>)});

    return (
        <div>
            <div className="categoryArray">{categoryDivArray}</div>
            <div className="subCategoryArray">{subCategoryDivArray}</div>
            <div onClick={() => {setCategory('All'); setSubCategory('All')}}>All</div>
        </div>
    )
}

export default DropDownMenu