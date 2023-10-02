let ItemWindow = function ({id,img_link,description,price}) {
    return (
        <div className="itemWindow" id={id}>
            <img src={img_link} alt=""></img>
            <p>{description}</p>
            <p>{price}€</p>
        </div>
    )
}

export default ItemWindow;

// Button that lets you add to cart!

// image path determined from index.html!