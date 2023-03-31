var apigClient = apigClientFactory.newClient({
    apiKey: 'VudB6IS5o04aZpdKrDWXL3elyiJF7gsw3lMxDkn9'
});


document.getElementById("search-button").addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    const query = searchInput.value;
    const additionalParams = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if (query) {
        console.log(query)
        apigClient.searchGet({ "q": query }, {}, additionalParams)
        .then(response => {
            // Handle the successful response here, e.g., display search results
            console.log('Search results:', response.data);
            searchResults.innerHTML = '';

            // Iterate through the image URLs and display them as images
            response.data.results.forEach(item => {
                const img = document.createElement("img");
                img.src = item.url;
                img.style.maxWidth = '200px'; // You can set the max width or height as desired
                img.style.margin = '10px';
                searchResults.appendChild(img);

                // Add labels as a paragraph below each image
                const labels = document.createElement("p");
                labels.textContent = `Labels: ${item.labels.join(', ')}`;
                searchResults.appendChild(labels);
            });
        })
        .catch(error => {
            // Handle the error response here, e.g., display an error message
            console.error('Error in searchGet request:', error);
        });
    } else {
        searchResults.innerHTML = "Please enter a search query.";
    }
});

const voiceSearchButton = document.getElementById('start-recording');
const voiceStopButton = document.getElementById('stop-recording');

document.getElementById("start-recording").addEventListener("click", () => {
    startRecording();
});

document.getElementById("stop-recording").addEventListener("click", () => {
    stopRecording();
});



let recognition = null;
let fullTranscript = "";
// Search for images using voice query
function startRecording() {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";
  recognition.onresult = function(event) {
    var query = event.results[event.results.length - 1][0].transcript;
    fullTranscript += " " + query.trim();
    console.log("full transcript: " + fullTranscript)
    document.getElementById('search-input').value = fullTranscript.trim();
  }
  recognition.start();
  console.log("started recording")
}

function stopRecording() {
  if (recognition) {
    recognition.stop();
    fullTranscript = ""
    console.log("Stopped recording");
  }
}