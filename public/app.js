// Add an event listener to the form for the submit event
document.getElementById('converter-form').addEventListener('submit', async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the values from the form inputs
    const number = document.getElementById('number').value;
    const fromBase = document.getElementById('fromBase').value;
    const toBase = document.getElementById('toBase').value;

    try {
        // Send a POST request to the server to perform the conversion
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send the number and base information as JSON
            body: JSON.stringify({ number, fromBase, toBase }),
        });

        // Parse the response JSON data
        const data = await response.json();
        // Update the result value on the page
        document.getElementById('resultValue').innerText = data.result;
        // Make the result section visible
        document.getElementById('result').style.display = 'block';

        // Fetch and update the conversion history
        fetchHistory();
    } catch (error) {
        // Log and alert the user if an error occurs
        console.error('Error:', error);
        alert('An error occurred.');
    }
});

// Function to fetch and display the conversion history
async function fetchHistory() {
    try {
        // Send a GET request to the server to fetch history
        const response = await fetch('/history');
        // Parse the response JSON data
        const history = await response.json();
        // Get the history list element
        const historyList = document.getElementById('historyList');
        // Clear any existing list items
        historyList.innerHTML = '';

        // Loop through each history entry and create a list item
        history.forEach(entry => {
            const li = document.createElement('li');
            // Set the list item text to display the history entry details
            li.textContent = `${entry.number} (${entry.fromBase}) to ${entry.result} (${entry.toBase}) on ${new Date(entry.date).toLocaleString()}`;
            // Append the list item to the history list
            historyList.appendChild(li);
        });
    } catch (error) {
        // Log and alert the user if an error occurs while fetching history
        console.error('Error:', error);
        alert('An error occurred while fetching history.');
    }
}

// Fetch and display history when the page is loaded
document.addEventListener('DOMContentLoaded', fetchHistory);