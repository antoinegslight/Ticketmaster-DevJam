var map;
var roadTripItinerary;
var myPosition;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initMap() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

    directionsDisplay.setMap(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
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


    start = new google.maps.LatLng(-34.397, 150.644);
    end = new google.maps.LatLng(-35.0, 150.644);
    calcRoute(start, end);
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

function calcRoute(start, end) {

    url = "https://www.maps.googleapis.com/maps/api/directions/json?";
    origin = "origin=" + start.lat + "," + start.lng;
    destination = "destination=" + end.lat + "," + end.lng;
    mode = "mode=" + "driving";
    finalURL = url + origin + "&" + destination + "&" + mode;
    $.ajax({
        headers: { "Accept": "application/json"},
        type: 'GET',
        url : finalURL,
        crossDomain: true,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },
        success: function(data, textStatus, request){
            console.log(data._embedded.events);
        }
    });
    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.DRIVING
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

