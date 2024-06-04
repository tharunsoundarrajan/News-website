let newsBox = document.getElementById('newsBox');
let spinner = document.getElementById('spinner');
let selectedCategoryElement = document.getElementById("selectedCategory");
let newsCategory = ['National', 'Business', 'Sports', 'World', 'Politics', 'Technology', 'Startup', 'Entertainment', 'Miscellaneous', 'Hatke', 'Science', 'Automobile','all'];

// Create XML Object
// Select the profile button by its ID


function translateToHindi() {
    // Detect the target language ('hi' for Hindi)
    const targetLanguage = 'hi';

    // Use the Google Translate API to change the page language
    new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,hi,ml', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
    );
    setTimeout(function() {
        const dropdown = document.querySelector('.goog-te-combo');
        dropdown.style.display = 'none';
    }, 1000); // Adjust the delay (in milliseconds) as needed
}
function translateToMalayalam() {
    // Detect the target language ('ml' for Malayalam)
    const targetLanguage = 'ml';

    // Use the Google Translate API to change the page language to Malayalam
    new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: targetLanguage, layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
    );

    // Hide the language dropdown after translation (optional)
    setTimeout(function() {
        const dropdown = document.querySelector('.goog-te-combo');
        dropdown.style.display = 'none';
    }, 1000); // Adjust the delay (in milliseconds) as needed
}

document.getElementById('malayalamBtn').addEventListener('click', () => {
    translateToMalayalam(); // Set language to Malayalam when Malayalam button is clicked
});

document.getElementById('hindiBtn').addEventListener('click', () => {
    translateToHindi(); // Set language to Hindi when Hindi button is clicked
});

window.addEventListener('load', () => {
    translateToHindi();
    // Hide the Hindi button after translation (optional)
   
});
window.addEventListener('load', () => {
    translateToMalayalam();
    
    // Hide the Hindi button after translation (optional)
   
});

function changeLanguage(language) {
    selectedLanguage = language;
    
    // Translate the entire page content
    translatePageTo(language);

    // Fetch news based on the selected language
    const selectedCategory = selectedCategoryElement.textContent.toLowerCase();
    const location = locationInput.value.trim();
    getNews(selectedCategory, '', '', location, selectedLanguage);
}
function translatePageTo(language) {
    const elementsToTranslate = [
        document.querySelector('.navbar-brand'), // Translate the brand name
        document.querySelector('.navbar-toggler-icon'), // Translate the menu icon
        document.querySelector('.form-control[aria-label="Enter a location"]'), // Translate location input placeholder
        // Add more elements you want to translate here
    ];
    elementsToTranslate.forEach((element) => {
        translate(element.getAttribute('placeholder') || element.textContent, { to: language })
            .then((translated) => {
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translated.text);
                } else {
                    element.textContent = translated.text;
                }
            })
            .catch((error) => {
                console.error('Translation error:', error);
            });
    });
}
const xhr = new XMLHttpRequest();
function updateNewsContent(data) {
let newsHTML = "";

for (let key in data) {
let news = `<div class="newsCard card">
<!-- News content here -->
</div>`;
newsHTML += news;
}

newsBox.innerHTML = newsHTML;
spinner.style.visibility = 'hidden';
newsBox.style.visibility = 'visible';
}

const breakingNewsElement = document.getElementById("breakingNewsText");

function sendCategory(index) {
getNews(newsCategory[index]);
}




function fetchBreakingNews(selectedDate) {
xhr.open('GET', `https://inshortsapi.vercel.app/breaking-news?date=${selectedDate}`, true);
xhr.onreadystatechange = function () {
if (xhr.readyState === 4 && xhr.status === 200) {
const data = JSON.parse(xhr.responseText);
if (data && data.length > 0) {
// Call the function to update breaking news text
updateBreakingNews(data[0].title);
const selectedCategory = selectedCategoryElement.textContent.toLowerCase();
getNews(selectedCategory, selectedDate);
}
} else if (xhr.readyState === 4) {
console.log("Error fetching breaking news");
}
}

xhr.send();
}

fetchBreakingNews();












// Call fetchBreakingNews function




// Attach click event listeners to category elements
let categoryElements = document.querySelectorAll('.dropdown-item');
categoryElements.forEach((categoryElement, index) => {
    categoryElement.addEventListener('click', () => {
        let categoryName = categoryElement.textContent;
        console.log('Selected category:', categoryName); // Add this line for debugging
        selectedCategoryElement.textContent = categoryName;
        document.querySelector('.navbar-brand').textContent = `InfoStream - ${categoryName}`;
        let selectedCategory = categoryName.toLowerCase();
        getNews(selectedCategory);
    });
    
});


// Search Bar Functionality
let searchForm = document.querySelector('.form-control');
searchForm.addEventListener('keyup', function(event) {
if (event.key === 'Enter') {
let searchTerm = searchForm.value.trim().toLowerCase();
if (searchTerm !== '') {
getNews(searchTerm);
}
}
});

getNews("all");

function getNews(newsCategoryName, selectedDate = '', searchTerm = '', location = '') {
    console.log('Fetching news for category:', newsCategoryName); // Add this line for debugging

xhr.open('GET', `https://inshortsapi.vercel.app/news?category=${newsCategoryName}&date=${selectedDate}&location=${location}`, true);

xhr.onreadystatechange = function () {
if (xhr.readyState === 4 && xhr.status === 200) {
let json = JSON.parse(xhr.responseText);
let data = json.data; // Get data Object

let newsHTML = "";

// Applying Loop on data to get inner elements
for (let key in data) {
if (searchTerm === '' || data[key].title.toLowerCase().includes(searchTerm)) {
let news = `<div class="newsCard card">
<img src="${data[key].imageUrl}"
onerror="this.src='images3.jpeg'; this.onerror=null;"
class="img ard-img-top img-thumbnail" alt="Image">
<h5 class="card-header">${data[key].title}</h5>
<div class="card-body">
<h5 class="card-title">Author: ${data[key].author}</h5>
<p class="card-text">${data[key].content}</p>
<a target="_blank" href="${data[key].readMoreUrl}" class="btn btn-primary">Read more..</a>
</div>
<div class="text-center card-footer text-muted">${data[key].date}</div>
</div>`;
newsHTML += news;
}
}

// Manipulating DOM
newsBox.innerHTML = newsHTML;
spinner.style.visibility = 'hidden';
newsBox.style.visibility = 'visible';
} else if (xhr.readyState === 4) {
console.log("Error fetching news");
}
}
document.addEventListener("DOMContentLoaded", () => {
const locationInput = document.getElementById("locationInput");
const locationBtn = document.getElementById("locationBtn");

const voiceSearchBtn = document.getElementById("voiceSearchBtn");
const newsContainer = document.getElementById("newsBox");
const calendarButton = document.getElementById('calendarButton');
const calendarContainer = document.getElementById('calendarContainer');
locationBtn.addEventListener("click", () => {
const location = locationInput.value.trim();
if (location !== '') {
getNews("all", "", "", location); // Call getNews with the location
}
});

locationBtn.addEventListener("click", () => {
const location = locationInput.value.trim();
if (location !== '') {
// Get the selected category
const selectedCategory = selectedCategoryElement.textContent.toLowerCase();
// Call the getNews function with the selected category and location
getNews(selectedCategory, '', '', location);
}
});
calendarButton.addEventListener('click', function () {
const datePicker = flatpickr(calendarContainer, {
dateFormat: 'yyyy-mm-dd', // Set the format to "yyyy-mm-dd"
disableMobile: true,
onChange: function(selectedDates, dateStr, instance) {
// Convert the selected date into the required format (yyyy-mm-dd)
const selectedDate = dateStr;

fetchBreakingNews(selectedDate);
// Get the current selected category
// Call the getNews function with the selected date and category
}
});
datePicker.open(); // Open the calendar
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
});

xhr.send(); // This is important to run the whole code
}