var map;
var roadTripItinerary;
var myPosition;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initMap() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.679016, lng: -73.950499},
        zoom: 8
    });


    //start = new google.maps.LatLng(-34.397, 150.644);
    //end = new google.maps.LatLng(-35.0, 150.644);
    //calcRoute(start, end);
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

