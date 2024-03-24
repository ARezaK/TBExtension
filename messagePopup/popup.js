// Load URLs and names from urls.json
fetch('urls.json')
    .then(response => response.json())
    .then(urls => {
        const selector = document.getElementById('serviceSelector');
        urls.forEach(service => {
            const option = new Option(service.Name, service.Url);
            selector.add(option);
        });
    })
    .catch(error => console.error('Error loading service URLs:', error));



// Using an async function to use await for asynchronous API calls
document.getElementById('fetchInfoButton').addEventListener('click', async () => {
    // Get the active tab in the current window
    let tabs = await messenger.tabs.query({ active: true, currentWindow: true });

    // Get the message currently displayed in the active tab
    let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);

	// Extract the email address from the message author string
    // The regular expression looks for text within angle brackets that looks like an email address
    const emailRegex = /<([^>]+)>/;
    const matches = emailRegex.exec(message.author);
    let email = matches ? matches[1] : message.author; // Use the extracted email if found, otherwise use the whole author string
    

    // Here, you could use message.author to get the sender's email if needed
    // For demonstration, we're making a request without using the email
    const selectedUrl = document.getElementById('serviceSelector').value;
    fetch(selectedUrl + encodeURIComponent(email))
        .then(response => response.json())
        .then(data => {
           // Convert the JSON object into a HTML string with clickable links
            let htmlStr = jsonToHtmlWithLinks(data);

            // Display the JSON string in a preformatted block to preserve formatting
            document.getElementById("jsonResponse").innerHTML = `<pre>${htmlStr}</pre>`;
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            document.getElementById("jsonResponse").textContent = 'Failed to fetch user info.' + error;
        });
})

// Convert a JSON object to an HTML string, making URLs clickable
function jsonToHtmlWithLinks(jsonObj) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let htmlStr = '<div>';

    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            let value = jsonObj[key];
            // Check if the value is a string and contains a URL
            if (typeof value === 'string' && urlRegex.test(value)) {
                value = value.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
            }
            htmlStr += `<div><strong>${key}:</strong> ${value}</div>`;
        }
    }

    htmlStr += '</div>';
    return htmlStr;
}


