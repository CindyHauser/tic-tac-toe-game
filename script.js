let fields = [
    null,
    'circle',
    null,
    null,
    'cross',
    null,
    null,
    null,
    null
];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    let html = '<table>';

    for (let i = 0; i < 9; i++) {

        // Neue Tabellenzeile alle 3 Felder
        if (i % 3 === 0) {
            html += '<tr>';
        }

        let symbol = '';

        if (fields[i] === 'circle') {
            symbol = 'o';
        } else if (fields[i] === 'cross') {
            symbol = 'x';
        }

        html += `<td>${symbol}</td>`;

        // Tabellenzeile schließen
        if (i % 3 === 2) {
            html += '</tr>';
        }
    }

    html += '</table>';

    contentDiv.innerHTML = html;
}
