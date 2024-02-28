
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

const visibility = document.querySelector(".visibility");
const humid = document.querySelector(".humid");
const wind = document.querySelector(".wind");

const windm = document.querySelector(".windm");
const windkm = document.querySelector(".windkm");

const vism = document.querySelector(".vism");
const viskm = document.querySelector(".viskm");

const mi = document.getElementById("mi");
const km = document.getElementById("km");

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

mi.addEventListener('click', () => switchDist("mi"));
km.addEventListener('click', () => switchDist("km"));

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
function getVisibility(cityData) {
    const visM = cityData.current.vis_miles + " mi";
    const visKM = cityData.current.vis_km + " km";
    return { visKM, visM }
}
function getWind(cityData) {
    const mi = cityData.current.wind_mph + " mi/h";
    const km = cityData.current.wind_kph + " km/h";
    return { mi, km }
}
function getHumidity(cityData) {
    return cityData.current.humidity + "%";
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
    humid.textContent = getHumidity(cityData);
    windm.textContent = getWind(cityData).mi;
    windkm.textContent = getWind(cityData).km;
    vism.textContent = getVisibility(cityData).visM;
    viskm.textContent = getVisibility(cityData).visKM;
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
function switchDist(temp) {
    if (temp == "km") {
        km.disabled = true;
        mi.disabled = false;
        windm.style.display = "none";
        windkm.style.display = "inline";
        vism.style.display = "none";
        viskm.style.display = "inline";
    }
    else {
        km.disabled = false;
        mi.disabled = true;
        windm.style.display = "inline";
        windkm.style.display = "none";
        vism.style.display = "inline";
        viskm.style.display = "none";
    }
}
switchTemps("C");
switchDist("km");
searchCity("Manila");
//'https://api.giphy.com/v1/gifs/translate?api_key=TlWUAC5CXB41l6QbJdEHKZN6A5yaFeTn&s=cats'