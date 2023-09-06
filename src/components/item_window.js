let ItemWindow = function ({img_link,description,price}) {
    return (
        <div>
            <img src={img_link} alt=""></img>
            <p>{description}</p>
            <p>{price}€</p>
        </div>
    )
}

export default ItemWindow;

// image path determined from index.html!