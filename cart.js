const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

let total = document.getElementById('total');
let shoppingCart = document.getElementById('cartItems');
var cartArray = [];

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
        generateCartItems();
})
    .catch(error => {
      console.error('Error:', error);
});

function generateCartItems() {
    let hasItems = false;
    var content = ""

    cartArray.forEach(obj => {
        if (obj.item > 0) {
            hasItems = true;
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
        totalPrice();
    } else {
        shoppingCart.innerHTML = `
        <div class="empty">
        <h1>Your cart is empty.</h1>
        <a href="products.html"><button type="button" class="btn btn-outline-dark clearCart">Go to Products</button></a>
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
    
    update(selectedItem.id);
    generateCartItems()
    patchAPI(selectedItem.id);
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
    update(selectedItem.id);
    generateCartItems()
    patchAPI(selectedItem.id);
};

function update(id) {
    let search = cartArray.find(x => x.id == id);

    var amt = document.getElementById(id); 

    amt.classList.add('fade');
  
    setTimeout(function(){
        amt.innerHTML = search.item;
        amt.classList.remove('fade');
    }, 180);

    totalPrice();
};

function trashItem(id) {
    let selectedItem = id;

    let search = cartArray.find(x => x.id == selectedItem.id);

    search.item = 0;
    
    generateCartItems();
    patchAPI(selectedItem.id);
}

function ClearCart() {
    cartArray.forEach(obj => {
        obj.item = 0;
        patchAPI(obj.id)
    })

    generateCartItems();
}

function totalPrice() {
    let amount = cartArray.map((x) => {
        return x.item * x.price;
    }).reduce((x,y)=>x+y, 0)
    total.innerHTML = `TOTAL: $${amount.toFixed(2)}`
}

function patchAPI(id) {
    console.log(cartArray);

    let search = cartArray.find(x => x.id == id)

    var settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(search)
      }
  
      fetch(`${apiUrl}/${search.apiID}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
}