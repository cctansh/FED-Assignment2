let shopitemsData = [{
    id:"1",
    name:"Ring1",
    price: 29.99,
    img: "img/bg.png",
    category:"ring"
},{
    id:"2",
    name:"Ring2",
    price: 24.99,
    img: "img/bg.png",
    category:"ring"
},{
    id:"3",
    name:"Necklace1",
    price: 59.99,
    img: "img/bg2.png",
    category:"necklace"
},{
    id:"4",
    name:"Bracelet",
    price: 39.99,
    img: "img/bg3.png",
    category:"bracelet"
}]

localStorage.setItem("data", JSON.stringify(basket));

let total = document.getElementById('total')

let shoppingCart = document.getElementById('cartArea')

function generateCartItems() {
    if (cartArray.length !== 0) {
        return;
    } else {
        shoppingCart.innerHTML = `
        <div class="empty">
        <h1>Your cart is empty.</h1>
        <a href="products.html"><button type="button" class="btn btn-outline-dark clearCart">Go to Products</button></a>
        </div>
        `
    }
}

generateCartItems();