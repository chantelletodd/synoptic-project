document.addEventListener('DOMContentLoaded', function() {
    const checkBox = document.getElementById('check');
    const alertBox = document.getElementById('alertbox');
    const stopAlertButton = document.getElementById('stop-alert-button');

    // Fetch initial checkbox state
    fetch('/checkbox-state')
        .then(response => response.json())
        .then(data => updateAlertBox(data.count))
        .catch(error => console.error('Error fetching checkbox state:', error));

    checkBox.addEventListener('change', function() {
        const checked = checkBox.checked;

        fetch('/update-checkbox', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked })
        })
        .then(() => fetch('/checkbox-state'))
        .then(response => response.json())
        .then(data => updateAlertBox(data.count))
        .catch(error => console.error('Error updating checkbox state:', error));
    });

    stopAlertButton.addEventListener('click', function() {
        fetch('/stop-alert', {
            method: 'POST'
        })
        .then(() => fetch('/checkbox-state'))
        .then(response => response.json())
        .then(data => updateAlertBox(data.count))
        .catch(error => console.error('Error stopping alert:', error));
    });

    function updateAlertBox(adminCount) {
        if (adminCount === 0) {
            alertBox.className = 'red';
        } else if (adminCount === 1) {
            alertBox.className = 'orange';
        } else if (adminCount >= 2) {
            alertBox.className = 'green';
        }
    }
});

function logout() {
    window.location.href = '/'; // Redirect to the website home page
}