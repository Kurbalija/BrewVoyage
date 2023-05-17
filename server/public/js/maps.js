function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function getWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.2&longitude=16.38&current_weather=true')
        .then(response => response.json())
        .then(data => {
            const currentTemperature = data.current_weather.temperature;
            const weatherElement = document.getElementById('weather');
            weatherElement.innerHTML = `<p>Current temperature in vienna: ${currentTemperature}°C</p>`;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

getWeather();