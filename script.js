// Handle form submission
document.getElementById('prediction-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload on form submission

    const playerName = document.getElementById('player-name').value.trim();
    const team = document.getElementById('team').value;

    if (!playerName || !team) {
        alert('Please fill out all fields!');
        return;
    }

    // Add or update prediction in Firebase
    const db = firebase.database();
    db.ref('predictions/' + playerName).set({
        team: team,
        editable: true,
    });

    // Reset form
    document.getElementById('prediction-form').reset();
});

// Fetch predictions and update the table in real-time
firebase.database().ref('predictions').on('value', (snapshot) => {
    const predictions = snapshot.val();
    updateTable(predictions);
});

// Function to update the predictions table
function updateTable(predictions) {
    const tbody = document.querySelector('#predictions-table tbody');
    tbody.innerHTML = ''; // Clear the table before re-populating

    for (const player in predictions) {
        const data = predictions[player];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player}</td>
            <td>${data.team}</td>
            <td>
                ${
                    data.editable
                        ? `<button onclick="editPrediction('${player}')">Edit</button>`
                        : 'Locked'
                }
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Edit a player's prediction
function editPrediction(player) {
    const db = firebase.database();

    const newTeam = prompt(`Enter a new team for ${player}:`);
    if (newTeam) {
        db.ref('predictions/' + player).update({
            team: newTeam,
        });
    }
}
