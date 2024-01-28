let shop = document.getElementById("productContent")

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

let basket = JSON.parse(localStorage.getItem("data")) || [];

function generateShop(a) {
    return (shop.innerHTML= a.map((x)=>{
        let search = basket.find(y => y.id == x.id) || [];
        return `
        <div id=product-id-${x.id} class="col-12 col-md-6 col-lg-4 item ${x.category}">
        <img width="90%" height="300px" src="${x.img}">
        <div class="details">
            <h3 class="pName">${x.name}</h3>
            <div class="price-quantity">
            <h4 class="pPrice">$${x.price}</h4>
            <div class="quantity-buttons">
                <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                <div id=${x.id} class="quantity">${search.item === undefined? 0: search.item}</div>
                <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
        </div>
        </div>
        `;
    }).join(""));
}

function Default() {
    generateShop(shopitemsData)
    CheckFilter();
}

function LowToHigh() {
    let products = structuredClone(shopitemsData);
    products.sort((a,b) => a.price - b.price);
    generateShop(products);
    CheckFilter();
}

function HighToLow() {
    let products = structuredClone(shopitemsData);
    products.sort((a,b) => b.price - a.price);
    generateShop(products);
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

var f = 'all';
generateShop(shopitemsData);
console.log(basket)

function increment(id) {
    let search = basket.find(x => x.id == id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    } else {
        search.item += 1;
    }

    localStorage.setItem("data", JSON.stringify(basket));

    update(id);
}

function decrement(id) {
    let search = basket.find(x => x.id == id);

    if(search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }

    localStorage.setItem("data", JSON.stringify(basket));

    update(id);
};

function update(id) {
    let search = basket.find(x => x.id == id);
    document.getElementById(id).innerHTML = search.item;

    console.log(basket)
};