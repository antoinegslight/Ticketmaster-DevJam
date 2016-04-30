var baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
var apiKey= "?apikey=BwE1Et7lNsg5BiYYRtZU56GRGZa4M92y";


var getNearShows = function(lattitude, longitude, date){

    var latlong = "&latlong=" + lattitude + "," +  longitude;
    var starTime = "&startDateTime=" + date;

    $.ajax({
        headers: { "Accept": "application/json"},
        type: 'GET',
        url : baseUrl + apiKey + latlong + starTime,
        crossDomain: true,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },
        success: function(data, textStatus, request){
            console.log(data._embedded.events);
        }
    });
};


getNearShows(40.679016, -73.950499, "2016-04-30T00:00:00Z");