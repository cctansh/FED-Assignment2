/* note about local storage:
item data is taken from API
item data may be changed by user on the page through increment/decrement function
hence, it is necessary to continually update/store this data somewhere that can be maintained
even if user refreshes the page.
can either be done by constantly sending patch requests to API, or by storing in local storage
to lessen API calls / avoid rate limit, local storage is used
API data is then only updated when entering/leaving page. 
note that actual scenario only local storage would be used to store cart item data (no API)
however as in this assignment, each html file is considered a different domain, local storage
cannot be used for this */

const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

// variables for loading div
let loading = document.getElementById("loading");
let loadingIcon = document.getElementById("loading-icon");
let nav = document.getElementById("navbar");
let body = document.getElementById('content')
let foot = document.getElementById('foot')

// DOM element
let shop = document.getElementById("product-content")
// to be used to store og item data
// used to check whether object in cartArray has been changed and needs to be patched to API
let compare = JSON.parse(localStorage.getItem("compare")) || [];
// stores currency exchange rates (from currency API)
var currency = JSON.parse(localStorage.getItem("currency")) || [];
// stores product values from API
var products = JSON.parse(localStorage.getItem("data")) || [];
// variables to check shop filter sort etc
// values are set to the default display values
var f = 'all';
var p = 'SGD';
var s = 'default';

if (products.length === 0) { // if no product data in local storage, get data from API
    // show loading div
    loading.classList.remove('hidden');
    loadingIcon.classList.remove('hidden');
    nav.classList.add('hidden');
    body.classList.add('hidden');
    foot.classList.add('hidden');

    // fetching product items
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
            // store in products array
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
            // fills compare with og cart item data, and stores both arrays in local storage
            compare = structuredClone(products);
            localStorage.setItem("data",JSON.stringify(products))
            localStorage.setItem("compare",JSON.stringify(compare))

            // generates product items in html
            generateShop(products);

            // storing currency exchange rate data in currency array
            getCurrencyArray();

            // hide loading div, show page
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
else { // if already data in products array
    generateShop(products) // generate shop
}

// gets exchange rates froma  currency API
function getCurrencyArray() {
    fetch(`https://v6.exchangerate-api.com/v6/94da67b3ea4623bed243d989/latest/SGD`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '94da67b3ea4623bed243d989',
          "Cache-Control": "no-cache"
        },
    })
        .then(response => response.json())
        .then(response => {
            // malaysia rate
            currency.push({
                country: 'MYR',
                rate: response.conversion_rates.MYR
            });
            // indonesia rate
            currency.push({
                country: 'IDR',
                rate: response.conversion_rates.IDR
            });
            // store array in local storage
            localStorage.setItem("currency",JSON.stringify(currency))
    })
        .catch(error => {
          console.error('Error:', error);
    });
}

// shows product items
function generateShop(a) {
    return (shop.innerHTML= a.map((x)=>{ // for each obj in array, perform function

        // exchange rate calcs
        var displayprice;
        // checking the global currency var to see which currency to display
        // if user is on singapore option
        if (p == 'SGD') { 
            displayprice = `$${x.price}`; // price is base price
        } 
        // malaysia
        else if (p == 'MYR') {
            let search = currency.find(x => x.country == 'MYR'); // get malaysia rate from array
            let rate = search.rate;
            displayprice = `RM${(x.price * rate).toFixed(2)}`; // calculate price and format
        } 
        //indonesia
        else if (p == 'IDR') {
            let search = currency.find(x => x.country == 'IDR'); //get indonesia rate from array
            let rate = search.rate;
            displayprice = `Rp${(x.price * rate).toFixed(2)}`; //calculate price nad format
        }

        // html for each product item
        return `
        <div id=product-id-${x.id} class="col-12 col-md-4 col-lg-3 item ${x.category}">
            <img class="product-img" src="${x.img}">
            <div class="details text-center">
                <div class="p-name-div">
                    <h3 class="p-name">${x.name}</h3>
                </div>
                <div class="p-price-div">
                    <h4 class="p-price">${displayprice}</h4>
                </div>
                <div class="quantity-buttons">
                    <i id=minus-${x.id} onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                    <div id=${x.id} class="quantity">${x.item}</div>
                    <i id=plus-${x.id} onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
        `;
    }).join("")); // merge all the htmls together
}

// displays default sorting view
function sortDefault() {
    generateShop(products) // default shop
    // check the current filter var, and filter based on that
    filterCat(f);
    // set global sort var to default
    s = 'default';
}

// displays products from low to high price
function lowToHigh() {
    // clone products array, and sort it from low to high price
    let sortedProducts = structuredClone(products);
    sortedProducts.sort((a,b) => a.price - b.price);
    // generate shop from the sorted array
    generateShop(sortedProducts);
    // check the current filter var, and filter based on that
    filterCat(f);
    // set global sort var to low to high
    s = 'lth';
}

// displays products from high to low price
function highToLow() {
    // clone products array, and sort it from high to low price
    let sortedProducts = structuredClone(products);
    sortedProducts.sort((a,b) => b.price - a.price);
    // generate shop from the sorted array
    generateShop(sortedProducts);
    // check the current filter var, and filter based on that
    filterCat(f);
   // set global sort var to high to low
    s = 'htl';
}

// filter products by category
function filterCat(c) {
    // get all product elements
    var x = document.querySelectorAll('.item');

    // set the global filter var to the new chosen category
    f = c;

    // if user wants to display all
    if (c == "all") {
        c = "item"; // then set the check var to the item class, which all products possess
    }

    // loop through every product
    for (var i = 0; i < x.length; i++) { 
        // if product contains the category class and is currently hidden, then show it
        if (x[i].classList.contains(c)) {
            if (x[i].classList.contains("hidden")) {
                x[i].classList.remove("hidden");
            }
        }
        // else if product doesnt contain category class and is showing, hide it
        else {
            if (!x[i].classList.contains("hidden")) {
                x[i].classList.add("hidden");
            }
        }
    }
}

// display currency in SGD
function changeSGD() {
    // set global currency value
    p = 'SGD';
    // checks global sort var, and displays corresponding shop order
    if (s == 'default') {
        sortDefault();
    } else if (s == 'lth') {
        lowToHigh();
    } else if (s == 'htl') {
        highToLow();
    }
}

// display currency in MYR
function changeMYR() {
    // set global currency value
    p = 'MYR';
    // checks global sort var, and displays corresponding shop order
    if (s == 'default') {
        sortDefault();
    } else if (s == 'lth') {
        lowToHigh();
    } else if (s == 'htl') {
        highToLow();
    }
}

// display currency in IDR
function changeIDR() {
    // set global currency value
    p = 'IDR';
    // checks global sort var, and displays corresponding shop order
    if (s == 'default') {
        sortDefault();
    } else if (s == 'lth') {
        lowToHigh();
    } else if (s == 'htl') {
        highToLow();
    }
}

// +1 product quantity
function increment(id) {
    let selectedItem = id;

    // animation when clicked (darkens plus button)
    var darken = document.getElementById(`plus-${selectedItem.id}`);
    darken.classList.add('dark');
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    // finds the specified item in array and adds to quantity
    let search = products.find(x => x.id == selectedItem.id);
    search.item += 1;
    
    // update quantity display and set local storage
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(products))
}

// -1 product quantity
function decrement(id) {
    let selectedItem = id;

    // animation when clicked (darkens plus button)
    var darken = document.getElementById(`minus-${selectedItem.id}`);
    darken.classList.add('dark');
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    // finds the specified item in array
    let search = products.find(x => x.id == selectedItem.id);
    if(search.item === 0) { // if already 0, do nothing
        return;
    } else { // else, -1
        search.item -= 1;
    }
    
    // update quantity display and set local storage
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(products))
};

// updates quantity display
function update(id) {
    // finds the specified item in array
    let search = products.find(x => x.id == id);

    // item quantity DOM element
    var amt = document.getElementById(id); 

    // fade out and in animation
    amt.classList.add('fade'); // fade out
    setTimeout(function(){
        amt.innerHTML = search.item; // changes display value
        amt.classList.remove('fade'); // fades back in
    }, 180);
};

// updates API, done whenever leaving page
function patchAPI(URL) {
    // clearing local storage
    // next time user goes to products page, it loads updated data from API
    // this is in case the user is coming from cart page, where item data may be changed
    // or had already checked out
    localStorage.clear();

    // while API is patching, show loading screen
    page = document.getElementsByTagName('body')[0];
    page.innerHTML = `
    <div>
		<div class="animation-center">
            <dotlottie-player src="https://lottie.host/00f5781f-7a7c-4254-91c1-5d58abf0f4fe/j0ppqxUpMa.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>
		</div>
	</div>
	`
    // patches any products that have changed data
    patchChangedObjects(products)
    .then(() => {
        // go to the entered URL once patches are done
        window.location.href = URL;
    })
    .catch(error => {
        console.error('Failed to patch changed objects:', error);
    });
}   
  
function hasObjectChanged(object, referenceArray) {
    // find the corresponding object in the reference array
    const referenceObject = referenceArray.find(item => item.id === object.id);
  
    // compares object with reference object
    // return true if changed, false otherwise
    return object.item !== referenceObject.item;
}
  
// patches individual object
async function patchObjectIfChanged(object) {
    try {
        if (hasObjectChanged(object, compare)) { // if object has changed, patch to API
            const response = await fetch(`${apiUrl}/${object.apiID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "x-apikey": apiKey,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({item: object.item}),
            });
            const result = await response.json();
            return result;
        } else { // if unchanged, skip patching
            return null; 
    }
    } catch (error) {
        console.error('Error patching object:', error);
        throw error;
    }
}
  
// checks and patches all objects in array
async function patchChangedObjects(array) {
    try {
        // calling patch object function on each object in array
        const patchPromises = array.map(patchObjectIfChanged);
        const results = await Promise.all(patchPromises);
        
        // filter out objects that were not patched
        const patchedObjects = results.filter(result => result !== null);

        return patchedObjects;
    } catch (error) {
        console.error('Error patching changed objects:', error);
        throw error;
    }
}