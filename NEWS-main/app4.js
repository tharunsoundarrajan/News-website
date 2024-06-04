const apiKey = '73e2f7b4f1a64ea096ec8a849aefef1e';
const wapiKey = '9b6aff045208cc09392049cb5a9f067d';

let newsBox = document.getElementById('newsBox');
let spinner = document.getElementById('spinner');
let selectedCategoryElement = document.getElementById("selectedCategory");
const voiceSearchBtn = document.getElementById('voiceSearchBtn');
const voiceOutput = document.getElementById('voiceOutput');
const weatherInfo = document.getElementById('weather-info');
const searchWeatherBtn = document.getElementById('searchWeatherBtn');
const locationInput = document.getElementById('location');

// Create an XMLHttpRequest object
const xhr = new XMLHttpRequest();
document.getElementById('search_form').addEventListener('submit', function (e) {
    e.preventDefault();
    const location = document.getElementById('location').value;

    // Call a function to fetch news based on location
    getNewsByLocation(location);
});

function getNewsByLocation(location) {
    spinner.style.visibility = 'visible';
    newsBox.style.visibility = 'hidden';

    // Create the API URL for location-based news
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${location}&apiKey=${apiKey}`;

    // Send the API request
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            updateNewsContent(data);
        } else if (xhr.readyState === 4) {
            console.log("Error fetching news");
        }
    }
    xhr.send();
}







// Function to update the news content
// Function to update the news content

// Function to update the news content
function updateNewsContent(data) {
    let newsHTML = "";

    for (let key in data.articles) {
        let article = data.articles[key];
        let news = `<div class="newsCard card">
            <img src="${article.urlToImage || 'placeholder_image_url'}" 
            onerror="this.src='images3.jpeg'; this.onerror=null;" 
            class="img-card-img-top img-thumbnail" alt="Image">
            <h5 class="card-header">
                <i id="speaker${key}" class="fas fa-volume-up speaker-icon" data-headline="${article.title}"></i>${article.title}
            </h5>
            <div class="card-body">
                <h5 class="card-title">Author: ${article.author}</h5>
                <p class="card-text">${article.description}</p>
               <a target="_blank" href="login.html" class="btn btn-primary">Read more..</a>
            </div>
            <div class="text-center card-footer text-muted">${article.publishedAt}</div>
        </div>`;
        newsHTML += news;
    }

    newsBox.innerHTML = newsHTML;
    spinner.style.visibility = 'hidden';
    newsBox.style.visibility = 'visible';

    // Add click event listeners to the speaker icons
    for (let key in data.articles) {
        const speakerIcon = document.getElementById(`speaker${key}`);
        if (speakerIcon) {
            speakerIcon.addEventListener('click', (event) => {
                const headline = event.target.getAttribute('data-headline');
                speakTextAloud(headline);
            });
        }
    }
}

// Function to fetch news based on the selected category
function getNews(category) {
    spinner.style.visibility = 'visible';
    newsBox.style.visibility = 'hidden';

    // Create the API URL
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    // Send the API request
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            updateNewsContent(data);
        } else if (xhr.readyState === 4) {
            console.log("Error fetching news");
        }
    }
    xhr.send();
}
// Voice search functionality
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    voiceSearchBtn.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        locationInput.value = result;
        voiceOutput.textContent = `Voice input: ${result}`;
        voiceOutput.style.display = 'block';
        // Call the getNewsByLocation function with the voice input
        getNewsByLocation(result);
    };

    recognition.onend = () => {
        voiceOutput.style.display = 'none';
    };
} else {
    voiceSearchBtn.style.display = 'none';
}

// Attach click event listeners to category elements
let categoryElements = document.querySelectorAll('#nav li a.data-category');
categoryElements.forEach((categoryElement, index) => {
    categoryElement.addEventListener('click', (event) => {
        event.preventDefault();
        let categoryName = categoryElement.textContent.toLowerCase(); // Convert to lowercase
        console.log('Selected category:', categoryName);
        selectedCategoryElement.textContent = categoryName;
        getNews(categoryName); // Send the category name as-is
    });
});
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    voiceSearchBtn.addEventListener("click", () => {
        recognition.start();
        voiceSearchBtn.textContent = "Listening...";
    });
    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log("You said:", speechResult);
        voiceSearchBtn.textContent = "Voice Search";

        getNews(speechResult);
        // Use the speechResult to perform a search and display news content
        // For demonstration purposes, we'll add a placeholder news item
        const newsItem = document.createElement("div");
        newsItem.className = "newsItem";
        newsItem.textContent = `You searched for: "${speechResult}"`;
        newsContainer.innerHTML = "";
        newsContainer.appendChild(newsItem);

        let categoryName = speechResult.textContent;
        speechResult.textContent = categoryName;
        document.querySelector('.navbar-brand').textContent = `InfoStream - ${speechResult}`;
    };
    recognition.onend = () => {
        voiceSearchBtn.textContent = "Voice Search";
    };
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        voiceSearchBtn.textContent = "Voice Search";
    };
} else {
    voiceSearchBtn.style.display = "none";
    console.log("Speech recognition not supported in this browser.");
}


// Function to fetch weather data
function getWeatherData(location) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const weatherData = {
        q: location,
        appid: apiKey,
        units: 'metric'
    };

    $.ajax({
        url: apiUrl,
        data: weatherData,
        method: 'GET',
        success: function (data) {
            if (data.cod === 200) {
                const weatherInfoHTML = `
                    <h2>Weather Details</h2>
                    <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
                    <p><strong>Description:</strong> ${data.weather[0].description}</p>
                    <p><strong>Temperature:</strong> ${data.main.temp.toFixed(2)}°C</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                `;
                $('#weather-info').html(weatherInfoHTML);
            } else {
                $('#weather-info').html('<p>Weather data not found for the specified location.</p>');
            }
        },
        error: function () {
            console.log('Error: Could not fetch weather data.'); // Log errors for debugging
            $('#weather-info').html('<p>An error occurred while fetching weather data.</p>');
        }
    });


// Event listener for the "Get Weather" button
searchWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        $('#weather-info').html('<p>Please enter a valid location.</p>');
    }
});

// Event listener for Enter key press in the location input field
locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const location = locationInput.value.trim();
        if (location) {
            getWeatherData(location);
        } else {
            $('#weather-info').html('<p>Please enter a valid location.</p>');
        }
    }
});

// Add event listeners to the speaker icons
let speakerIcons = document.querySelectorAll('.speaker-icon');
speakerIcons.forEach((speakerIcon) => {
    speakerIcon.addEventListener('click', (event) => {
        const headline = event.target.getAttribute('data-headline');
        speakTextAloud(headline);
    });
});
}

// Function to speak text aloud using Web Speech API
function speakTextAloud(text) {
const synth = window.speechSynthesis;
const voices = synth.getVoices();
const utterance = new SpeechSynthesisUtterance(text);

// Choose a voice (you can customize this part)
utterance.voice = voices[0]; // Using the first available voice

// Speak the text
synth.speak(utterance);
}







// Initial load with 'general' category
getNews('general');