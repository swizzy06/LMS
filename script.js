// Object to store predictions
const predictions = {};

// Handle form submission
document.getElementById('prediction-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const playerName = document.getElementById('player-name').value.trim();
    const team = document.getElementById('team').value;

    if (!playerName || !team) {
        alert('Please fill out all fields!');
        return;
    }

    // Add or update the player's prediction
    predictions[playerName] = { team, editable: true };

    // Update the table with the live predictions
    updateTable();

    // Reset the form
    document.getElementById('prediction-form').reset();
});

// Function to update the table
function updateTable() {
    const tbody = document.querySelector('#predictions-table tbody');
    tbody.innerHTML = '';

    for (const [player, data] of Object.entries(predictions)) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${player}</td>
            <td>${data.team}</td>
            <td>
                ${data.editable ? `<button onclick="editPrediction('${player}')">Edit</button>` : 'Locked'}
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Function to edit a prediction
function editPrediction(player) {
    if (!predictions[player].editable) return;

    const team = prompt(`Update the team for ${player}:`, predictions[player].team);
    if (team) {
        predictions[player].team = team;
        updateTable();
    }
}
