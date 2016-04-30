var map;
var roadTripItinerary;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

    var infoWindow = new google.maps.InfoWindow({map: map});
    var myPosition;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(myPosition);
            infoWindow.setContent('Location found.');
            map.setCenter(myPosition);
            var marker = new google.maps.Marker({
                position: myPosition,
                map: map,
                title: 'My position'
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var myJSON = {city : "Québec",
        country : "Canada",
        date : "2016-06-25",
        latitude : "46.82495800",
        longitude : "-71.24762000",
        name : "Def Leppard",
        time : "19:00:00",
        url : "http://ticketmaster.ca/event/10005058AC4343CC",
        venue : "Centre Videotron"}
    var myItinerary = new roadTripItinerary();
    myItinerary.setEventList([myJSON]);
    myItinerary.addAllEventToMap()
}

function addEventToMap(event){
    eventPosition = {
        lat: event.latitude,
        lng: event.longitude
    };
    var marker = new google.maps.Marker({
        position: eventPosition,
        map: map,
        title: event.name
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

