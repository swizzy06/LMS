// Object to store player predictions
const predictions = {};

// Handle form submission
document.getElementById('prediction-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload on form submission

    // Get player name and selected team
    const playerName = document.getElementById('player-name').value.trim();
    const team = document.getElementById('team').value;

    // Validate inputs
    if (!playerName || !team) {
        alert('Please fill out all fields!');
        return;
    }

    // Add or update the player's prediction
    predictions[playerName] = { team, editable: true };

    // Update the predictions table
    updateTable();

    // Clear the form fields for the next submission
    document.getElementById('prediction-form').reset();
});

// Function to update the predictions table
function updateTable() {
    const tbody = document.querySelector('#predictions-table tbody');
    tbody.innerHTML = ''; // Clear the table before re-populating

    // Loop through the predictions object and add rows
    for (const [player, data] of Object.entries(predictions)) {
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

// Function to edit a player's prediction
function editPrediction(player) {
    if (!predictions[player].editable) {
        alert("You can't edit this prediction anymore!");
        return;
    }

    // Prompt the user for a new team
    const newTeam = prompt(
        `Update the team for ${player}:`,
        predictions[player].team
    );

    // Validate the input and update the prediction
    if (newTeam) {
        predictions[player].team = newTeam;
        updateTable();
    }
}
