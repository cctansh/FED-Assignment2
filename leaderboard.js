const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/leaderboard';

let loading = document.getElementById("loading");
let loadingIcon = document.getElementById("loading-icon");
let nav = document.getElementById("navbar");
let body = document.getElementById('content')
let foot = document.getElementById('foot')

var usersData = [];
let board = document.getElementById('leaderboard');

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
            usersData.push({
                apiID: response[i]._id,
                dn: response[i].dn,
                email: response[i].email,
                password: response[i].password,
                spent: response[i].spent,
            })
        }
        usersData.sort((a,b) => b.spent - a.spent);
        console.log(usersData);
        printLeaderboard();
        loading.classList.add('hidden');
        loadingIcon.classList.add('hidden');
        nav.classList.remove('hidden');
        body.classList.remove('hidden');
        foot.classList.remove('hidden');
})
    .catch(error => {
      console.error('Error:', error);
});

function printLeaderboard() {
    let text = '';
    for (var i = 1; i <= usersData.length; i++) {
        text = `${text}
            <div class="board-row row${i}">
                <div class="rank">
                    ${i}
                </div>
                <div class="name">
                    ${usersData[i-1].dn}
                </div>
                <div class="spent">
                    $${usersData[i-1].spent}
                </div>
            </div>
            `
    }
    board.innerHTML = text;
}