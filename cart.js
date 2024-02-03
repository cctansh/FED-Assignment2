const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

// variables for loading div
let loading = document.getElementById("loading");
let loadingIcon = document.getElementById("loading-icon");
let nav = document.getElementById("navbar");
let body = document.getElementById('content')
let foot = document.getElementById('foot')

// for total price
let total = document.getElementById('total');
var bill = 0;

// api use (getting cart items)
var cartArray = JSON.parse(localStorage.getItem("data")) || [];
// to be used to store og item data
// used to check whether object in cartArray has been chanegd and needs to be patched to API
let compare = JSON.parse(localStorage.getItem("compare")) || []; 

// cart area to add items
let shoppingCart = document.getElementById('cart-items');

// if no local storage, get data from API
if (cartArray.length === 0) {
    // show loading div
    loading.classList.remove('hidden');
    loadingIcon.classList.remove('hidden');
    nav.classList.add('hidden');
    body.classList.add('hidden');
    foot.classList.add('hidden');

    // fetching cart items
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
            // filling cartArray with data
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

            // fills compare with og cart item data, and stores both arrays in local storage
            compare = structuredClone(cartArray);
            localStorage.setItem("data",JSON.stringify(cartArray))
            localStorage.setItem("compare",JSON.stringify(compare))

            // fills cart are with items
            generateCartItems();

            // hide loading div
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
// if local storage already contains cart data
else {
    generateCartItems();
}

// fills cart are with items
function generateCartItems() {
    let hasItems = false; // bool to check whether cart is empty
    var content = "" // to insert into cartarea innerhtml
    bill = 0; // total bill for order

    cartArray.forEach(obj => {
        if (obj.item > 0) { // only runs if the specified product quantity > 0
            hasItems = true; // as cart has items, set to true

            bill += obj.price * obj.item; // for each item, add the total item price to total bill

            // adding html for each item
            content = `
            ${content}
            <div id=product-id-${obj.id} class="cart-item text-center">
                <i onclick="trashItem(${obj.id})" class="bi bi-x-circle trash"></i>
                <img class="cart-img" src="${obj.img}">
                <div class="details">
                    <div class="p-name-div">
                        <h3 class="p-name">${obj.name}</h3>
                    </div>
                    <div class="p-price-div">
                        <h4 class="p-price">$${(obj.price * obj.item).toFixed(2)}</h4>
                    </div>
                    <div class="quantity-buttons">
                            <i id=minus-${obj.id} onclick="decrement(${obj.id})" class="bi bi-dash-lg"></i>
                            <div id=${obj.id} class="quantity">${obj.item}</div>
                            <i id=plus-${obj.id} onclick="increment(${obj.id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>`
        } 
    })

    bill = bill.toFixed(2) // making sure bill is $xx.xx

    if (hasItems) { // if cart has items, fill html with items, display total bill
        shoppingCart.innerHTML = content;
        total.innerHTML = `TOTAL: $${bill}`
    } else { // if empty, display cart empty message, display total bill is zero
        shoppingCart.innerHTML = `
        <div class="empty">
        <h1>Your cart is empty.</h1>
        <button type="button" class="btn btn-outline-dark clear-cart" onclick="patchAPI('products.html');">VIEW PRODUCTS</button>
        </div>
        `
        total.innerHTML = `TOTAL: $00.00`
    }
}

// +1 to item quantity
function increment(id) {
    let selectedItem = id;

    // animation when clicked (darkens plus button)
    var darken = document.getElementById(`plus-${selectedItem.id}`);
    darken.classList.add('dark');
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    // finds the specified item in array and adds to quantity
    let search = cartArray.find(x => x.id == selectedItem.id);
    search.item += 1;
    
    // update displayed quantity and local storage data
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(cartArray))
}

// -1 to item quantity
function decrement(id) {
    let selectedItem = id;

        // animation when clicked (darkens minus button)
    var darken = document.getElementById(`minus-${selectedItem.id}`);
    darken.classList.add('dark');
    setTimeout(function(){
        darken.classList.remove('dark');
    }, 200);

    // finds the specified item in array
    let search = cartArray.find(x => x.id == selectedItem.id);
    if(search.item === 0) { // if already 0, do nothing
        return;
    } else { // if more than 0, -1 quantity
        search.item -= 1;
    }

    // update displayed quantity and local storage data 
    // if product quantity = 0, generateCartItems() will not display it
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(cartArray))
};

function trashItem(id) {
    let selectedItem = id;
    
    // finds the specified item in array and sets to 0
    let search = cartArray.find(x => x.id == selectedItem.id);
    search.item = 0;
    
    // updates cart display and local storage data 
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(cartArray))
}

function clearCart() {
    // sets all item quantities to zero
    cartArray.forEach(obj => {
        obj.item = 0;
    })

    // updates cart display and local storage data 
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(cartArray))
}

function checkout() {
    let hasItems = false; // bool to check whether cart is empty

    // sets all item quantities to zero
    cartArray.forEach(obj => {
        if (obj.item > 0) { // only runs if the specified product quantity > 0
            hasItems = true; // as cart has items, set to true
            obj.item = 0;
        }
    })

    if (hasItems){ // if cart has items, success and navigate to next page
        // using query parameters to send bill variable to wheel page
        if (bill >= 150) {  // $150 wheel
            patchAPI("wheel150.html?bill=" + encodeURIComponent(bill));
        } else if (bill >= 100) { // $100 wheel
            patchAPI("wheel100.html?bill=" + encodeURIComponent(bill));
        } else if (bill >= 50) { // $50 wheel
            patchAPI("wheel50.html?bill=" + encodeURIComponent(bill));
        }
        else { // no wheel, straight to leaderboard form
            patchAPI("leaderboardform.html?bill=" + encodeURIComponent(bill));
        }
    } else { // if cart is empty, cannot checkout, do nothing
        return;
    }
}

// updates API, done whenever leaving cart page
function patchAPI(URL) {
    // clearing local storage
    // next time user goes to cart page, it loads updated data from API
    // this is in case the user is coming from product page, where item data may be changed
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
    patchChangedObjects(cartArray)
    .then(() => {
        // go to the entered URL once patches are done
        window.location.href = URL;
    })
    .catch(error => {
        console.error('Failed to patch changed objects:', error);
    });
}   
  

function hasObjectChanged(object, referenceArray) {
    // finds the corresponding object in reference array
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
            console.log('Object patched successfully:', result);
            return result;
        } else { // if unchanged, skip patching
            console.log('Object has not changed. Skipped patching.');
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

        console.log('All changed objects patched successfully:', patchedObjects);
        return patchedObjects;
    } catch (error) {
        console.error('Error patching changed objects:', error);
        throw error;
    }
}