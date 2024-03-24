// In background.js
browser.browserAction.onClicked.addListener((tab) => {
  // Assuming you're using a function fetchSenderInfo() to handle the GET request and display.
  fetchSenderInfo();
});

function fetchSenderInfo() {
  // Use the messages API to get the currently displayed message
  browser.messages.list({}).then(messages => {
    const currentMessage = messages.messages[0]; // Simplified for example
    const senderEmail = currentMessage.author; // Get the sender's email
    
    // Now, make a GET request to your backend with the sender's email
    // Replace `YOUR_BACKEND_URL` with the actual backend URL
    fetch(`YOUR_BACKEND_URL?email=${encodeURIComponent(senderEmail)}`)
      .then(response => response.json())
      .then(data => {
        // Handle the data received from your backend
        console.log(data); // For example, log it to the console
      })
      .catch(error => {
        console.error('Error fetching sender info:', error);
      });
  });
}

