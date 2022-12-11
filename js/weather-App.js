// OpenWeatherMap API. Do not share it publicly.
const api = '9145262d057997ba9710a3ffb3e56ffc'; //Replace 
//with your API to store it in this variable 

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

// event listener will be activated when the page loads.
// this arrow function will be used to hold users location
window.addEventListener('load', () => {
    let long;
    let lat;
    // Accessing Geolocation of User if it it available it will show a pop up.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        //these two variables stores the data values
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

            //getting APIs data using fetch
            fetch(base)
                .then((response) => {
                    return response.json();// this turns the API into a JSON object
                })
                .then((data) => {
                    const { temp } = data.main;
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;

                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    // Converting Epoch(Unix) time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    // Interacting with DOM to show data
                    iconImg.src = iconUrl;//changing image
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(2)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                });
        });
    }
});
// Current date
const todaysDate = new Date();
document.getElementById("CurrentDate").innerHTML = todaysDate;

// Current time
let clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    if (hrs == 0) {
      hrs = 12;
    } else if (hrs >= 12) {
      hrs = hrs - 12;
      period = "PM";
    }
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
  
    let time = `${hrs}:${mins}:${secs}:${period}`;
    document.getElementById("CurrentTime").innerText = time;
    setTimeout(clock, 1000);
  };
  
  clock();





