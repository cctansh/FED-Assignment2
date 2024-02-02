const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

let loading = document.getElementById("loading");
let loadingIcon = document.getElementById("loading-icon");
let nav = document.getElementById("navbar");
let body = document.getElementById('content')
let foot = document.getElementById('foot')

let shop = document.getElementById("productContent")
var products = JSON.parse(localStorage.getItem("data")) || [];
var f = 'all';

if (products.length === 0) {
    loading.classList.remove('hidden');
    loadingIcon.classList.remove('hidden');
    nav.classList.add('hidden');
    body.classList.add('hidden');
    foot.classList.add('hidden');

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
                    apiID: response[i]._id,
                    id: response[i].id,
                    name: response[i].name,
                    price: response[i].price,
                    img: response[i].img,
                    category: response[i].category,
                    item: response[i].item,
                })
            }
            localStorage.setItem("data",JSON.stringify(products))
            generateShop(products);
            
            loading.classList.add('hidden');
            loadingIcon.classList.add('hidden');
            nav.classList.remove('hidden');
            body.classList.remove('hidden');
            foot.classList.remove('hidden');
    })
        .catch(error => {
          console.error('Error:', error);
    });
}
else {
    generateShop(products)
}



function generateShop(a) {
    return (shop.innerHTML= a.map((x)=>{
        return `
        <div id=product-id-${x.id} class="col-12 col-md-4 col-lg-3 item ${x.category}">
            <img class="productImg" src="${x.img}">
            <div class="details text-center">
                <div class="pNameDiv">
                    <h3 class="pName">${x.name}</h3>
                </div>
                <div class="pPriceDiv">
                    <h4 class="pPrice">$${x.price}</h4>
                </div>
                <div class="quantity-buttons">
                    <i id=minus-${x.id} onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                    <div id=${x.id} class="quantity">${x.item}</div>
                    <i id=plus-${x.id} onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
        `;
    }).join(""));
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
    let selectedItem = id;
    var darken = document.getElementById(`plus-${selectedItem.id}`);
    darken.classList.add('dark');
  
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    let search = products.find(x => x.id == selectedItem.id);

    search.item += 1;
    
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(products))
}

function decrement(id) {
    let selectedItem = id;
    var darken = document.getElementById(`minus-${selectedItem.id}`);
    darken.classList.add('dark');
  
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    let search = products.find(x => x.id == selectedItem.id);

    if(search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(products))
};

function update(id) {
    let search = products.find(x => x.id == id);

    var amt = document.getElementById(id); 

    amt.classList.add('fade');
  
    setTimeout(function(){
        amt.innerHTML = search.item;
        amt.classList.remove('fade');
    }, 180);
};

function delay (URL) {
    setTimeout( function() { window.location.href = URL }, 20000);
    page = document.getElementsByTagName('body')[0];
    page.innerHTML = `
    <div>
		<div class="animation-center">
            <dotlottie-player src="https://lottie.host/00f5781f-7a7c-4254-91c1-5d58abf0f4fe/j0ppqxUpMa.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>
		</div>
	</div>
	`;
}

function patchAPI() {
    localStorage.clear();
    products.forEach(obj => {
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
    