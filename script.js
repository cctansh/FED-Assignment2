const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

let shop = document.getElementById("productContent")
var products = [];
var f = 'all';

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
            products.push({
                id: response[i].id,
                name: response[i].name,
                price: response[i].price,
                img: response[i].img,
                category: response[i].category,
                item: response[i].item,
            })
        }

        generateShop();
})
    .catch(error => {
      console.error('Error:', error);
});

function generateShop() {
    var content = ""
    for (var i = 0; i < products.length; i++) {
        let x = products[i];
        content += `
        <div id=product-id-${x.id} class="col-12 col-md-6 col-lg-4 item ${x.category}">
        <img width="90%" height="300px" src="${x.img}">
        <div class="details">
            <h3 class="pName">${x.name}</h3>
            <div class="price-quantity">
            <h4 class="pPrice">$${x.price}</h4>
            <div class="quantity-buttons">
                <i id=minus-${x.id} onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                <div id=${x.id} class="quantity">${x.item}</div>
                <i id=plus-${x.id} onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
        </div>
        </div>
        `;
    }
    return (shop.innerHTML= content);
}

function Default() {
    generateShop(products)
    CheckFilter();
}

function LowToHigh() {
    let sortedProducts = structuredClone(products);
    sortedProducts.sort((a,b) => a.price - b.price);
    generateShop(sortedProducts);
    CheckFilter();
}

function HighToLow() {
    let sortedProducts = structuredClone(products);
    sortedProducts.sort((a,b) => b.price - a.price);
    generateShop(sortedProducts);
    CheckFilter();
}

function filterCat(c) {
    var x = document.querySelectorAll('.item');

    f = c;

    if (c == "all") {
        c = "item";
    }

    for (var i = 0; i < x.length; i++) {
        if (x[i].classList.contains(c)) {
            if (x[i].classList.contains("hidden")) {
                x[i].classList.remove("hidden");
            }
        }
        else {
            if (!x[i].classList.contains("hidden")) {
                x[i].classList.add("hidden");
            }
        }
    }
}

function CheckFilter() {
    switch (f) {
        case "all":
            filterCat(f);
            break;
        case "ring":
            filterCat(f);
            break;
        case "necklace":
            filterCat(f);
            break;
        case "bracelet":
            filterCat(f);
            break;
    }
}

function increment(id) {
    var darken = document.getElementById(`plus-${id}`);
    darken.classList.add('dark');
  
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    let search = products.find(x => x.id == id);

    search.item += 1;
    

    update(id);
    localStorage.setItem("data", JSON.stringify(products));


}

function decrement(id) {
    var darken = document.getElementById(`minus-${id}`);
    darken.classList.add('dark');
  
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    let search = products.find(x => x.id == id);

    if(search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(id);

    localStorage.setItem("data", JSON.stringify(products));
    
};

function update(id) {
    let search = products.find(x => x.id == id);

    var amt = document.getElementById(id); 

    amt.classList.add('fade');
  
    setTimeout(function(){
        amt.innerHTML = search.item;
        amt.classList.remove('fade');
    }, 180);

    console.log(products)
};

