document.addEventListener('DOMContentLoaded', () => {
    // Example: Fetch sender info from your server
    // This is a static example. You'll replace the URL and parameters with your actual backend call.
    fetch('https://yourbackend.example.com/senderinfo?email=example@example.com')
        .then(response => response.json())
        .then(data => {
            // Assuming 'data' contains 'name', 'email', 'location', and 'bio'
            document.getElementById('senderName').textContent = data.name || 'Unknown';
            document.getElementById('senderEmail').textContent = data.email || 'Unknown';
            document.getElementById('senderLocation').textContent = data.location || 'Unknown';
            document.getElementById('senderBio').textContent = data.bio || 'No bio available.';
        })
        .catch(error => {
            console.error('Error fetching sender info:', error);
            // Update the UI to show an error message or default information
        });
});

