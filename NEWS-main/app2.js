// Define your API key for the News API
const apiKey = 'f5e30bbfe87e473b820dc416cfbee965';

let newsBox = document.getElementById('newsBox');
let spinner = document.getElementById('spinner');
let selectedCategoryElement = document.getElementById("selectedCategory");

// List of news categories
let newsCategory = ['general', 'business', 'sports', 'world', 'politics', 'technology', 'startup', 'entertainment', 'science', 'automobile'];

// Create an XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Function to update the news content
function updateNewsContent(data) {
    let newsHTML = "";

    for (let key in data.articles) {
        let article = data.articles[key];
        let news = `<div class="newsCard card">
            <img src="${article.urlToImage || 'placeholder_image_url'}" 
            onerror="this.src='images3.jpeg'; this.onerror=null;" 
            class="img-card-img-top img-thumbnail" alt="Image">
            <h5 class="card-header">${article.title}</h5>
            <div class="card-body">
                <h5 class="card-title">Author: ${article.author}</h5>
                <p class="card-text">${article.description}</p>
                <a target="_blank" href="${article.url}" class="btn btn-primary">Read more..</a>
            </div>
            <div class="text-center card-footer text-muted">${article.publishedAt}</div>
        </div>`;
        newsHTML += news;
    }

    newsBox.innerHTML = newsHTML;
    spinner.style.visibility = 'hidden';
    newsBox.style.visibility = 'visible';
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

// Attach click event listeners to category elements
let categoryElements = document.querySelectorAll('.dropdown-item');
categoryElements.forEach((categoryElement, index) => {
    categoryElement.addEventListener('click', () => {
        let categoryName = categoryElement.textContent.toLowerCase();
        console.log('Selected category:', categoryName);
        selectedCategoryElement.textContent = categoryName;
        document.querySelector('.navbar-brand').textContent = `InfoStream - ${categoryName}`;
        getNews(categoryName);
    });
});

// Initial load with 'general' category
getNews('general');
