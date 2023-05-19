/* Google Maps API*/
function myMap() {
    /* Das ist daweil nur ein template, wird alles später implementiert.*/
    /* Die API KEY, werden wir nach außerhalb 'public' verlagern und es im GitIgnore hinzufügen. */
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


/* Wetter API */
function getWeather() {
    /* Temperaturdaten aus Wien, klicke den Link und schau dir die JSON in ihrer Struktur genau an. */
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.2&longitude=16.38&current_weather=true')
        .then(response => response.json())
        .then(data => {
            /* Geht in die JSON und holt nur aus Reiter "data->current-weather->temperature" die Daten. */
            const currentTemperature = data.current_weather.temperature;
            const weatherElement = document.getElementById('weather');
            weatherElement.innerHTML = `<p>Current temperature in Vienna: ${currentTemperature}°C</p>`;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

getWeather();