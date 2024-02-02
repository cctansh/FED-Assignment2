const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/leaderboard';

var urlParams = new URLSearchParams(window.location.search);
var bill = urlParams.get('bill');
var signUpMsg = document.getElementById('signup-error-message');
var logInMsg = document.getElementById('login-error-message');

// Array to store user data
var usersData = [];

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
            usersData.push({
                apiID: response[i]._id,
                dn: response[i].dn,
                email: response[i].email,
                password: response[i].password,
                spent: response[i].spent,
            })
        }
        console.log(usersData);
})
    .catch(error => {
      console.error('Error:', error);
});

function validateSignUp() {
    var dn = document.getElementById('dn').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // check if dn exists
    var dnExists = usersData.some(function(user) {
        return user.dn === dn;
    });

    // Simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        signUpMsg.innerText = 'Invalid email address.';
        return;
    }

    // Check if the email already exists
    var emailExists = usersData.some(function(user) {
        return user.email === email;
    });

    if (dnExists) {
        signUpMsg.innerText = 'Display name already in use. Please choose a different display name.';
        return;
    }

    if (emailExists) {
        signUpMsg.innerText = 'Email already exists. Please use a different email.';
        return;
    }

    // Password should be at least 8 characters long
    if (password.length < 8) {
        signUpMsg.innerText = 'Password should be at least 8 characters long';
        return;
    }

    // If both email and password are valid and email is unique, store data in the array
    var userData = {
        dn: dn,
        email: email,
        password: password,
        spent: bill
    };

    delay('leaderboard.html');

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": apiKey,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(userData)
        })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log('User signed up successfully. User data:', userData);
        console.log(usersData);
    });
}

function validateLogin() {
    var loginEmail = document.getElementById('login-email').value;
    var loginPassword = document.getElementById('login-password').value;

    let userMatch = false;

    usersData.forEach(user => {
        if (user.email === loginEmail && user.password === loginPassword) {
            userMatch = true;
            console.log(user.spent);
            console.log(bill);

            user.spent = (parseFloat(user.spent) + parseFloat(bill)).toFixed(2);

            console.log(user.spent);
            
            delay('leaderboard.html');
            
            fetch(`${apiUrl}/${user.apiID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": apiKey,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify({spent: user.spent})
                })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log('User signed up successfully. User data:', user);
            })
        }
    })
    
    if (!userMatch) {
        logInMsg.innerText = 'Invalid email or password';
    }
}

function GoToForm() {
    let cover = document.getElementById("coverpage");
    let regform = document.getElementById("registerform");

    cover.classList.add('hidden');
    regform.classList.remove('hidden');
}

function delay (URL) {
    setTimeout( function() { window.location.href = URL }, 3500);
    page = document.getElementsByTagName('body')[0];
    page.innerHTML = `
    <div>
        <div class="animation-center">
            <dotlottie-player src="https://lottie.host/4df75fe6-c931-4c01-acc5-0415ee2a7327/9mga8gITqI.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="bounce" loop autoplay></dotlottie-player>
            <h4>Updating your data...</h4>
        </div>
    </div>
	`;
}