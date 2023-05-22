/* Google Maps API*/
function myMap() {
    /* Das ist daweil nur ein template, wird alles später implementiert.*/
    /* Die API KEY, werden wir nach außerhalb 'public' verlagern und es im GitIgnore hinzufügen. */
    var mapProp = {
        center: new google.maps.LatLng(48.208176, 16.373819), // Koordinaten von Wien
        zoom: 12,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // Initialisiere den Places Service
    var service = new google.maps.places.PlacesService(map);

    // Definiere die Art von Ort, nach der du suchen möchtest (in diesem Fall "cafe")
    var request = {
        location: map.getCenter(),
        radius: '5000', // Radius in Metern um die Position des Benutzers
        type: ['store'], // Art des Ortes, den du suchen möchtest (in diesem Fall "store")
        keyword: 'teehaus', // Schlagwort für die Suche (in diesem Fall "teehaus")
    };

    // Führe die Places Service-Suche aus
    service.nearbySearch(request, callback);

    // Callback-Funktion für die Ergebnisse der Suche
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                // Hier kannst du die gefundenen Teehäuser nutzen oder anzeigen
                console.log(place.name, place.geometry.location);
                createMarker(place); // Erstelle einen Marker für jedes Teehaus
            }
        }
    }

    // Funktion zum Erstellen eines Markers für einen Ort und Anzeigen eines Infofensters
    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
        });

        var infoWindow = new google.maps.InfoWindow({
            content: place.name, // Inhalt des Infofensters
        });

        // Ereignislistener für den Klick auf den Marker
        marker.addListener('click', function() {
            infoWindow.open(map, marker); // Öffnet das Infofenster beim Klick auf den Marker
        });
    }

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