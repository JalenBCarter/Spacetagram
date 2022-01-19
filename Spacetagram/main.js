const like = document.getElementById("like");
const dateInput = document.getElementById("date-select")

// initializes the main app
const appInit = async () => {
    like.classList = "icon not-liked";
    // get user input
    const date = getDateInput();
    // construct url
    const url = constructURL(date);
    // fetch data fom api
    const json = await fetchData(url);
    // display data in browser
    displayData(json);
};

// load app when the DOM content is loaded
document.addEventListener("DOMContentLoaded", appInit);
// reload app to update content when date is changed
dateInput.addEventListener("change", appInit)

// -------------------------------- get date selection
getDateInput = () => {
    // select date input element
    let dateSelector = document.getElementById('date-select');
    // derive value
    let dateValue = dateSelector.value;
    // convert to date string format
    let dateString = dateValue.toString('yyyy-MM-dd');
    
    return dateString;
};

// construct a URL using selected date as an argument
constructURL = (date) => {
    const api = 'https://api.nasa.gov/planetary/apod?date=';
    const apiKey = '&api_key=N0R4A1XKz4CRhg4UowYSkkI9Ef7mUWJIabLTZNXu';
    const url = api + date + apiKey;
    
    return url;
};

// fetch data using constructed URL
fetchData = async (url) => {
    const response = await fetch(url);
    const json = await response.json();

    // display JSON data in console
    console.log(json);
    
    return json;
};

// display data
const displayData = (json) => {
    document.getElementById("image").src = json.hdurl;
    document.getElementById("title").innerHTML = json.title;
    document.getElementById("author").innerHTML = json.copyright;
    document.getElementById("description").innerHTML = json.explanation;
    document.getElementById("date").innerHTML = json.date;
};

// simple like button to toggle on and off
const likeListener = () => {
    like.classList.toggle("not-liked");
    like.classList.toggle("liked");
    
    console.log("i'm listening!")
};

like.addEventListener("click", likeListener);