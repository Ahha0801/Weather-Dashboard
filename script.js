var cityName = document.getElementById("city-input");
var searchBtn = document.querySelector(".searchBtn");
var temperature = document.getElementById("temperature")      
var humidity = document.getElementById("humidity")     
var wind = document.getElementById("wind")
var cityElement = document.getElementById("city")
var recentSearches = document.querySelector('.recent-searches')
var date = document.getElementById('date')

// after reading local storage, this will hold our recent cities
let pastCities = [];
var apiKey = "04db571ee2624aeeb3be00d40bc75d0a";
var city;


function getCityName() {
  city = cityName.value;
  console.log(city);
  // current weather
  getCurrentWeather(city);
  // fiveday weather
  getForecastWeather(city);
  // add the searched city to the pastCities array
  pastCities.push(city)
  // creates a <p> and puts in our recent searches html
  renderCity(city)
  // stores the new city to the localStorage
  storeCities() 
}

function getCurrentWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then((res) => res.json())
    .then((data) => {
      // get the current date
      const currentDate = new Date();
      // format the date to show only the month, day, and year
      const formattedDate = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      // display the formatted date in the HTML
      date.innerHTML = formattedDate;

      cityElement.innerHTML = city 
      temperature.innerHTML = Math.floor(data.main.temp)
      humidity.innerHTML = Math.floor(data.main.humidity)
      wind.innerHTML = Math.floor(data.wind.speed)
    });
}

var fiveDayTemp = document.querySelectorAll(".fiveDay-temp")
var fiveDayHum = document.querySelectorAll(".fiveDay-humid")
var fiveDayWind = document.querySelectorAll(".fiveDay-wind")

function getForecastWeather(cityName) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for(let i = 0; i < fiveDayTemp.length; i++) {
        fiveDayTemp[i].innerHTML = ""
        fiveDayHum[i].innerHTML = ""
        fiveDayWind[i].innerHTML = ""
        var forecastIndex = i * 8 + 4
        fiveDayTemp[i].innerHTML = Math.floor(data.list[i].main.temp)
        fiveDayHum[i].innerHTML = Math.floor(data.list[i].main.humidity)
        fiveDayWind[i].innerHTML = Math.floor(data.list[i].wind.speed)
      }
    });
}

function loadCities() {
  const storedCities = JSON.parse(localStorage.getItem("pastCities"));
  if (storedCities) {
    pastCities = storedCities;
    pastCities.forEach(city => {
      renderCity(city)
    })
  }
}

function renderCity(city) {
  var paragraph = document.createElement('p')
  paragraph.innerHTML = city
  recentSearches.append(paragraph)
}

function storeCities() {
  localStorage.setItem("pastCities", JSON.stringify(pastCities));
}

loadCities()
searchBtn.addEventListener("click", getCityName);
