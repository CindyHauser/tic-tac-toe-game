let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle';
let currentWinner = null;
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

function init() {
    render();
    updatePlayerHighlight();
    updateStatus();
}

function render() {
    const contentDiv = document.getElementById('content');
    let html = '<div id="game-container"><table>';

    for (let i = 0; i < 9; i++) {

        if (i % 3 === 0) {
            html += '<tr>';
        }
        let symbol = '';

        if (fields[i] === 'circle') {
            symbol = generateCircleSVG();
        } else if (fields[i] === 'cross') {
            symbol = generateCrossSVG();
        }
        html += `<td onclick="handleClick(this, ${i})">${symbol}</td>`;

        if (i % 3 === 2) {
            html += '</tr>';
        }
    }
    html += '</table></div>';
    contentDiv.innerHTML = html;
}

function updatePlayerHighlight() {

    const circles = document.querySelectorAll('.player-circle');
    const crosses = document.querySelectorAll('.player-cross');

    circles.forEach(circle => circle.classList.remove('active-player'));
    crosses.forEach(cross => cross.classList.remove('active-player'));

    if (currentPlayer === 'circle') {
        circles.forEach(circle => circle.classList.add('active-player'));
    } else {
        crosses.forEach(cross => cross.classList.add('active-player'));
    }
};

function updateStatus() {
    const statusDiv = document.getElementById('status');

    if (currentWinner) {
        statusDiv.textContent = currentWinner === 'circle' ? 'Kreis hat gewonnen!' : 'Kreuz hat gewonnen!';
        return;
    }

    if (gameOver && fields.every(field => field !== null)) {
        statusDiv.textContent = 'Unentschieden!';
        return;
    }

    statusDiv.textContent = currentPlayer === 'circle' ? 'Kreis ist dran' : 'Kreuz ist dran';
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    currentWinner = null;
    gameOver = false;
    currentPlayer = 'circle';
    updatePlayerHighlight();
    render();
    updateStatus();
}

function handleClick(element, index) {

    if (gameOver || fields[index] !== null) {
        return;
    }

    if (currentPlayer === 'circle') {
        fields[index] = 'circle';
        element.innerHTML = generateCircleSVG();
        currentPlayer = 'cross';

    } else {
        fields[index] = 'cross';
        element.innerHTML = generateCrossSVG();
        currentPlayer = 'circle';
    }

    element.onclick = null;

    const winner = checkWinner();

    if (winner) {
        currentWinner = winner;
        gameOver = true;
    } else if (fields.every(field => field !== null)) {
        gameOver = true;
    }
    updatePlayerHighlight();
    updateStatus();
};

function checkWinner() {

    for (let i = 0; i < winningCombinations.length; i++) {

        let combination = winningCombinations[i];

        let a = fields[combination[0]];
        let b = fields[combination[1]];
        let c = fields[combination[2]];

        if (a && a === b && a === c) {
            drawWinningLine(combination);
            return a;
        }
    }
    return null;
};

function drawWinningLine(combination) {

    const mobile = window.innerWidth <= 450;
    const cellSize = mobile ? 80 : 120;
    const boardSize = cellSize * 3;

    const lines = {
        '0,1,2': `top:${cellSize / 2}px; left:0; width:${boardSize}px; height:5px;`,
        '3,4,5': `top:${cellSize * 1.5}px; left:0; width:${boardSize}px; height:5px;`,
        '6,7,8': `top:${cellSize * 2.5}px; left:0; width:${boardSize}px; height:5px;`,
        '0,3,6': `top:0; left:${cellSize / 2}px; width:5px; height:${boardSize}px;`,
        '1,4,7': `top:0; left:${cellSize * 1.5}px; width:5px; height:${boardSize}px;`,
        '2,5,8': `top:0; left:${cellSize * 2.5}px; width:5px; height:${boardSize}px;`,
        '0,4,8': `top:0; left:0; width:5px; height:${boardSize * 1.42}px; transform:rotate(-45deg); transform-origin:top left;`,
        '2,4,6': `top:0; right:0; width:5px; height:${boardSize * 1.42}px; transform:rotate(45deg); transform-origin:top right;`
    };

    document.getElementById('game-container').innerHTML += `<div style="position:absolute; background:white; border-radius:10px; ${lines[combination]}"></div>`;
};

function generateCircleSVG() {
    const size = window.innerWidth <= 450 ? 50 : 70;

    return `<svg width="${size}" height="${size}" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="30" stroke="#00aff0" stroke-width="6" fill="none"
        stroke-dasharray="188.5" stroke-dashoffset="188.5">
        <animate attributeName="stroke-dashoffset" from="188.5" to="0" dur="125ms" fill="freeze"/>
        </circle>
    </svg>`;
};

function generateCrossSVG() {
    const size = window.innerWidth <= 450 ? 50 : 70;

    return `<svg width="${size}" height="${size}" viewBox="0 0 70 70">
        <line x1="0" y1="0" x2="70" y2="70" stroke="#fec000" stroke-width="6"
        stroke-linecap="round" stroke-dasharray="99" stroke-dashoffset="99">
        <animate attributeName="stroke-dashoffset" from="99" to="0" dur="125ms" fill="freeze"/>
        </line>

        <line x1="70" y1="0" x2="0" y2="70" stroke="#fec000" stroke-width="6"
        stroke-linecap="round" stroke-dasharray="99" stroke-dashoffset="99">
        <animate attributeName="stroke-dashoffset" from="99" to="0" dur="125ms"
        begin="125ms" fill="freeze"/>
        </line>
    </svg>`;
};
