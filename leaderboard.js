var data = [
    {
        dn: 'name1',
        spent: '23.33'
    },
    {
        dn: 'name2',
        spent: '24.33'
    },
    {
        dn: 'name3',
        spent: '25.33'
    },
    {
        dn: 'name4',
        spent: '27.33'
    }
];

let board = document.getElementById('leaderboard');

function printLeaderboard() {
    let text = '';
    for (var i = 1; i <= data.length; i++) {
        text = `${text}
            <div class="boardRow row${i}">
                <div class="rank">
                    ${i}
                </div>
                <div class="name">
                    ${data[i-1].dn}
                </div>
                <div class="spent">
                    $${data[i-1].spent}
                </div>
            </div>
            `
    }
    board.innerHTML = text;
}

printLeaderboard();