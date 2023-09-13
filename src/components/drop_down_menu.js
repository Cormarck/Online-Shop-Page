let DropDownMenu = function ({searchCategory}) {
    return (
        <div>
            <button onClick={() => searchCategory('All')}>All</button>
            <button onClick={() => searchCategory('Test')}>Test</button>
            <button onClick={() => searchCategory('Test2')}>Test2</button>
        </div>
    )
}

export default DropDownMenu