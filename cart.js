const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

let total = document.getElementById('total');
let shoppingCart = document.getElementById('cartItems');
var cartArray = JSON.parse(localStorage.getItem("data")) || [];

if (cartArray.length === 0) {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': apiKey,
          "Cache-Control": "no-cache"
        },
    })
        .then(response => response.json())
        .then(response => {
    
            for (var i = 0; i < response.length; i++) {
                cartArray.push({
                    apiID: response[i]._id,
                    id: response[i].id,
                    name: response[i].name,
                    price: response[i].price,
                    img: response[i].img,
                    category: response[i].category,
                    item: response[i].item,
                })
            }
            localStorage.setItem("data",JSON.stringify(cartArray))
            generateCartItems();
    })
        .catch(error => {
          console.error('Error:', error);
    });
}
else {
    generateCartItems();
}

function generateCartItems() {
    let hasItems = false;
    var content = ""
    var total = 0;

    cartArray.forEach(obj => {
        if (obj.item > 0) {
            hasItems = true;
            total += obj.price * obj.item;
            content = `
            ${content}
            <div id=product-id-${obj.id} class="cartItem text-center">
                <i onclick="trashItem(${obj.id})" class="bi bi-x-circle-fill trash"></i>
                <img width="193px" height="250px" src="${obj.img}">
                <div class="details">
                    <h3 class="pName">${obj.name}</h3>
                    <div class="price-quantity">
                        <h4 id="pPrice" class="pPrice">$${(obj.price * obj.item).toFixed(2)}</h4>
                        <div class="quantity-buttons">
                            <i id=minus-${obj.id} onclick="decrement(${obj.id})" class="bi bi-dash-lg"></i>
                            <div id=${obj.id} class="quantity">${obj.item}</div>
                            <i id=plus-${obj.id} onclick="increment(${obj.id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`
        } 
    })

    if (hasItems) {
        shoppingCart.innerHTML = content;
        total.innerHTML = `TOTAL: $${total.toFixed(2)}`
    } else {
        shoppingCart.innerHTML = `
        <div class="empty">
        <h1>Your cart is empty.</h1>
        <button type="button" class="btn btn-outline-dark clearCart" onclick="patchAPI();delay('products.html');">Go to Products</button>
        </div>
        `
        total.innerHTML = `TOTAL: $00.00`
    }
}

function increment(id) {
    let selectedItem = id;
    var darken = document.getElementById(`plus-${selectedItem.id}`);
    darken.classList.add('dark');
  
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    let search = cartArray.find(x => x.id == selectedItem.id);

    search.item += 1;
    
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(cartArray))
}

function decrement(id) {
    let selectedItem = id;
    var darken = document.getElementById(`minus-${selectedItem.id}`);
    darken.classList.add('dark');
  
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    let search = cartArray.find(x => x.id == selectedItem.id);

    if(search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(cartArray))
};

function trashItem(id) {
    let selectedItem = id;

    let search = cartArray.find(x => x.id == selectedItem.id);

    search.item = 0;
    
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(cartArray))
}

function ClearCart() {
    cartArray.forEach(obj => {
        obj.item = 0;
    })

    generateCartItems();
    localStorage.setItem("data",JSON.stringify(cartArray))
}

function delay (URL) {
    setTimeout( function() { window.location = URL }, 10000);
}

function patchAPI() {
    localStorage.clear();
    cartArray.forEach(obj => {
        fetch(`${apiUrl}/${obj.apiID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apiKey,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({item: obj.item})
            })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    })
}    

