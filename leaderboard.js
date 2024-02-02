const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/leaderboard';

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
        localStorage.setItem("data",JSON.stringify(usersData))
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
        document.getElementById('signup-error-message').innerText = 'Invalid email address.';
        return;
    }

    // Check if the email already exists
    var emailExists = usersData.some(function(user) {
        return user.email === email;
    });

    if (dnExists) {
        document.getElementById('signup-error-message').innerText = 'Display name already in use. Please choose a different display name.';
        return;
    }

    if (emailExists) {
        document.getElementById('signup-error-message').innerText = 'Email already exists. Please use a different email.';
        return;
    }

    // Password should be at least 8 characters long
    if (password.length < 8) {
        document.getElementById('signup-error-message').innerText = 'Password should be at least 8 characters long';
        return;
    }

    // If both email and password are valid and email is unique, store data in the array
    var userData = {
        dn: dn,
        email: email,
        password: password,
        spent: 232
    };

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
            // Clear any previous error messages
        document.getElementById('signup-error-message').innerText = '';
        console.log('User signed up successfully. User data:', userData);
        console.log(usersData);
    });
}

function validateLogin() {
    var loginEmail = document.getElementById('login-email').value;
    var loginPassword = document.getElementById('login-password').value;

    // Check if there is a match in the array
    var userMatch = usersData.find(function(user) {
        return user.email === loginEmail && user.password === loginPassword;
    });

    if (userMatch) {
        document.getElementById('login-error-message').innerText = 'Login successful!';
    } else {
        document.getElementById('login-error-message').innerText = 'Invalid email or password';
    }
}