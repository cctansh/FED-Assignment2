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

let generateShop =(data)=>{
    return (shop.innerHTML= data.map((x)=>{
        return `
        <div class="col-12 col-md-6 col-lg-4 item ${x.category}">
        <img width="90%" height="300px" src="${x.img}">
        <div class="details">
            <h3 class="pName">${x.name}</h3>
            <div class="price-quantity">
            <h4 class="pPrice">$${x.price}</h4>
            <div class="quantity-buttons">
                <i class="bi bi-dash-lg"></i>
                <div class="quantity">0</div>
                <i class="bi bi-plus-lg"></i>
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

Default();

var f = 'all';
