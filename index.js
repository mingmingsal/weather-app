
const img = document.querySelector('img');
const h1 = document.querySelector('h1');
const p = document.querySelector('.condition');
const input = document.querySelector('input');
const temp = document.querySelector('.temp');
const tempCButton = document.getElementById("tempC");
const tempFButton = document.getElementById("tempF");
const tempCResult = document.querySelectorAll(".tempCResult");
const tempFResult = document.querySelectorAll(".tempFResult");
const tempCFeelsResult = document.querySelectorAll(".tempCFeelsResult");
const tempFFeelsResult = document.querySelectorAll(".tempFFeelsResult");
const tempC = document.querySelectorAll(".tempC");
const tempF = document.querySelectorAll(".tempF");
const date = document.querySelector(".date");

const imgDisplay = document.querySelector(".picture");
function userSearch() {
    searchCity(input.value);
}
async function searchCity(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9b0559a62a46497cb0264450242802&q=${city}`, { mode: 'cors' });
    const cityData = await response.json();
    console.log(cityData);
    renderDOM(cityData);
};

tempCButton.addEventListener('click', () => switchTemps("C"));
tempFButton.addEventListener('click', () => switchTemps("F"));
function getCity(cityData) {
    return cityData.location.name;
}
function getCondition(cityData) {
    return cityData.current.condition.text;
}
function getTemp(cityData) {
    const tempC = cityData.current.temp_c;
    const tempF = cityData.current.temp_f;
    return { tempC, tempF }
}
function getDate(cityData){
    let msec = Date.parse(cityData.current.last_updated);
    return new Date(msec).toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"}) ;
}
function getFeelsTemp(cityData) {
    const tempC = cityData.current.feelslike_c;
    const tempF = cityData.current.feelslike_f;
    return { tempC, tempF }
}
function renderDOM(cityData) {
    h1.textContent = getCity(cityData);
    p.textContent = getCondition(cityData);
    tempFResult.forEach(element => {
        element.textContent = getTemp(cityData).tempF + "°";
    });
    tempCResult.forEach(element => {
        element.textContent = getTemp(cityData).tempC + "°";
    });
    tempFFeelsResult.forEach(element => {
        element.textContent = getFeelsTemp(cityData).tempF + "°";
    });
    tempCFeelsResult.forEach(element => {
        element.textContent = getFeelsTemp(cityData).tempC + "°";
    });
    date.textContent = getDate(cityData);
}
function switchTemps(temp) {
    if (temp == "C") {
        tempCButton.disabled = true;
        tempFButton.disabled = false;
        tempF.forEach(element => {
            element.style.display = "none";
        });
        tempC.forEach(element => {
            element.style.display = "inline";
        });
    }
    else {
        tempCButton.disabled = false;
        tempFButton.disabled = true;
        tempF.forEach(element => {
            element.style.display = "inline";
        });
        tempC.forEach(element => {
            element.style.display = "none";
        });
    }
}
switchTemps("C");
searchCity("Manila");
//'https://api.giphy.com/v1/gifs/translate?api_key=TlWUAC5CXB41l6QbJdEHKZN6A5yaFeTn&s=cats'