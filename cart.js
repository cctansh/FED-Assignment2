const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/basket';

let loading = document.getElementById("loading");
let loadingIcon = document.getElementById("loading-icon");
let nav = document.getElementById("navbar");
let body = document.getElementById('content')
let foot = document.getElementById('foot')

var bill = 0;

let total = document.getElementById('total');
let shoppingCart = document.getElementById('cartItems');
var cartArray = JSON.parse(localStorage.getItem("data")) || [];
let compare = [];

if (cartArray.length === 0) {
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
            compare = structuredClone(cartArray);
            localStorage.setItem("data",JSON.stringify(cartArray))
            generateCartItems();

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
    generateCartItems();
}

function generateCartItems() {
    let hasItems = false;
    var content = ""
    bill = 0;

    cartArray.forEach(obj => {
        if (obj.item > 0) {
            hasItems = true;
            bill += obj.price * obj.item;
            content = `
            ${content}
            <div id=product-id-${obj.id} class="cartItem text-center">
                <i onclick="trashItem(${obj.id})" class="bi bi-x-circle trash"></i>
                <img class="cartImg" src="${obj.img}">
                <div class="details">
                    <div class="pNameDiv">
                        <h3 class="pName">${obj.name}</h3>
                    </div>
                    <div class="pPriceDiv">
                        <h4 id="pPrice" class="pPrice">$${(obj.price * obj.item).toFixed(2)}</h4>
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

    bill = bill.toFixed(2)

    if (hasItems) {
        shoppingCart.innerHTML = content;
        total.innerHTML = `TOTAL: $${bill}`
    } else {
        shoppingCart.innerHTML = `
        <div class="empty">
        <h1>Your cart is empty.</h1>
        <button type="button" class="btn btn-outline-dark clearCart" onclick="patchAPI();delay('products.html');">VIEW PRODUCTS</button>
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

function Checkout() {
    cartArray.forEach(obj => {
        obj.item = 0;
    })

    if (bill >= 150) {
        patchAPI("Wheel150.html?bill=" + encodeURIComponent(bill));
    } else if (bill >= 100) {
        patchAPI("Wheel100.html?bill=" + encodeURIComponent(bill));
    } else if (bill >= 50) {
        patchAPI("Wheel50.html?bill=" + encodeURIComponent(bill));
    }
    else {
        patchAPI("leaderboardform.html?bill=" + encodeURIComponent(bill));
    }
}

function patchAPI(URL) {
    localStorage.clear();
    page = document.getElementsByTagName('body')[0];
    page.innerHTML = `
    <div>
		<div class="animation-center">
            <dotlottie-player src="https://lottie.host/00f5781f-7a7c-4254-91c1-5d58abf0f4fe/j0ppqxUpMa.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>
		</div>
	</div>
	`
      // Call the patchChangedObjects function and navigate to results.html once all patches are done
    patchChangedObjects(cartArray)
    .then(() => {
        // Navigate to results.html only when all patches are successful
        window.location.href = URL;
    })
    .catch(error => {
        // Handle errors if any of the patches fail
        console.error('Failed to patch changed objects:', error);
    });
}   
  
// Function to check if an object has changed
function hasObjectChanged(object, referenceArray) {
    // Find the corresponding object in the reference array
    const referenceObject = referenceArray.find(item => item.id === object.id);
  
    // Implement your logic to compare the object with the reference object
    // Return true if changed, false otherwise
    // For simplicity, this example assumes a field named 'lastModified' to check for changes
    return object.item !== referenceObject.item;
}
  
  // Function to patch an individual object if it has changed
async function patchObjectIfChanged(object) {
    try {
    // Check if the object has changed against the reference array
    if (hasObjectChanged(object, compare)) {
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
    } else {
        console.log('Object has not changed. Skipped patching.');
        return null; // Return null to indicate that the object was not patched
    }
    } catch (error) {
    console.error('Error patching object:', error);
    throw error;
    }
}
  
  // Function to patch only changed objects in the array
async function patchChangedObjects(array) {
    try {
    const patchPromises = array.map(patchObjectIfChanged);
    const results = await Promise.all(patchPromises);
    
    // Filter out null results (objects that were not patched)
    const patchedObjects = results.filter(result => result !== null);

    console.log('All changed objects patched successfully:', patchedObjects);
    return patchedObjects;
    } catch (error) {
    console.error('Error patching changed objects:', error);
    throw error;
    }
}