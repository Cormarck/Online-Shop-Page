import { useState } from "react";
import  "../css/categorySelect.css";
import { removeClass, toggleClass} from "./usefull_functions.js";

// get -> all categorys
    // create Array with all mastercategorys
    let masterCategoryArray = [];
    let getMasterCategorys = async function () {
        let res = await fetch('/getMasterCategorys', {
            method: "get",
        });
        masterCategoryArray = await res.json();
        console.log("master-category", masterCategoryArray);
    }
    await getMasterCategorys();

    // create Array with all categorys
    let categoryArray = [];
    let getCategorys = async function () {
        let res = await fetch('/getCategorys', {
            method: "get",
        });
    categoryArray = await res.json();
    // res is array of categorys
    console.log("category", categoryArray);
    /*categorys.forEach(item => {categoryArray.push(item.Name) });*/
    }
    await getCategorys();
    // categoryAttay = [{Name: ..., masterCategoryName: ...}, ...]
    
    // create Array with all subcategorys
    let subCategoryArray = [];
    let getSubCategorys = async function (category) {
        let res = await fetch('/getSubCategorys', {
            method: "get",
        });
    subCategoryArray = await res.json();
    console.log("sub-category", subCategoryArray)
    }
    await getSubCategorys();
    // subCategoryArray = [{Name: ..., categoryName: ...}, ...]


let DropDownMenu = function ({setMasterCategory,setCategory,setSubCategory}) {

    // creates ARray with buttons to select a master category
    let masterCategoryDivArray = [];
    masterCategoryDivArray.push (<div onClick={() => {setMasterCategory('All'); setCategory('All'); setSubCategory('All');    setCategoryDivArray([]); setSubCategoryDivArray([]);    setDisplayedMasterCategory('');setDisplayedCategory('');setDisplayedSubCategory('') }}>All</div>)
    masterCategoryArray.forEach(item => {masterCategoryDivArray.push(<div className="masterCategory" key={item.Name + item.Id} onClick={() => {setMasterCategory(item.Id); setCategory('All'); setSubCategory('All');       filterCategoryArray(item.Id); setSubCategoryDivArray([]);         setDisplayedMasterCategory(item.Name);setDisplayedCategory('');setDisplayedSubCategory('');     removeClass('.categoryArray','hide')}}>{item.Name}</div>)})

    // creates Array with buttons to select a category
    let [categoryDivArray,setCategoryDivArray] =useState([])
    let filterCategoryArray = function (filter) {
        let filteredArray = [];
        filteredArray.push(<div onClick={() => {setCategory('All'); setSubCategory('All');                  setSubCategoryDivArray([]);                   setDisplayedCategory('');setDisplayedSubCategory('')}}>All</div>)
        categoryArray.forEach(item => {if (item.masterCategoryId === filter) {filteredArray.push(<div className="category" key={item.Name + item.Id} onClick={() => {setCategory(item.Id); setSubCategory('All');         filterSubCategory(item.Id);           setDisplayedCategory(item.Name);setDisplayedSubCategory('');    removeClass('.subCategoryArray','hide')}}>{item.Name}</div>)}});
        setCategoryDivArray([...filteredArray]);
    }
    //------------------------------------------------------------------------------

    // creates Array with buttons to select a sub category --------------------------
    let [subCategoryDivArray,setSubCategoryDivArray] = useState([])
    let filterSubCategory = function(filter) {
        let filteredArray = [];
        filteredArray.push(<div onClick={() => {setSubCategory('All'); setDisplayedSubCategory('')}}>All</div>)
        subCategoryArray.forEach(item => {if (item.categoryId === filter) {filteredArray.push(<div className="subCategory" key={item.Name + item.Id} onClick={() => {setSubCategory(item.Id); setDisplayedSubCategory(item.Name)}}>{item.Name}</div>)}});
        setSubCategoryDivArray([...filteredArray]);
    }
    // ------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------
    

    // changes displayed categorys ----------------------------------------------------
    let displayMasterCategory ='Master-Kategorie';
    let [displayedMasterCategory,setDisplayedMasterCategory] = useState('');
    let displayCategory = 'Kategorie';
    let [displayedCategory,setDisplayedCategory] = useState('');
    let displaySubCategory = 'Unter-Kategorie';
    let [displayedSubCategory,setDisplayedSubCategory] = useState('');

    // -------------------------------------------------------------------------------

    return (
        <div>
            <div id="choseMasterCategory"><div id="masterCategoryDisplay" onClick={() => {toggleClass('.masterCategoryArray','hide')}}>{displayMasterCategory}:{displayedMasterCategory}</div><div className="masterCategoryArray">{masterCategoryDivArray}</div></div>
            <div id="choseCategory"><div id="categoryDisplay" onClick={() => {toggleClass('.categoryArray','hide')}}>{displayCategory}:{displayedCategory}</div><div className="categoryArray hide">{categoryDivArray}</div></div>
            <div id="choseSubCategory"><div id="subCategoryDisplay" onClick={() => {toggleClass('.subCategoryArray','hide')}}>{displaySubCategory}:{displayedSubCategory}</div><div className="subCategoryArray">{subCategoryDivArray}</div></div>
        </div>
    )
}

export default DropDownMenu