var baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
var apiKey= "?apikey=BwE1Et7lNsg5BiYYRtZU56GRGZa4M92y";


var getNearShows = function(lattitude, longitude, date){

    var latlong = "&latlong=" + lattitude + "," +  longitude;
    var starTime = "&startDateTime=" + date;
    var size = "&size=100";

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

var incrementDay = function(date){
    var year = parseInt(date.substring(0,4));
    var month = parseInt(date.substring(5,7));
    var day = parseInt(date.substring(8,10));
    var time = date.substring(10);

    var currentDay = new Date(year, month-1, day);
    currentDay.setDate(currentDay.getDate() + 1);

    day = currentDay.getDate();
    month = currentDay.getMonth() + 1;
    year = currentDay.getFullYear();

    var incrementedDate = year + "-";
    if(month<10){
        incrementedDate += "0"
    }
    incrementedDate += month + "-";
    if(day<10){
        incrementedDate += "0";
    }
    incrementedDate += day + "" + time;
    return incrementedDate;
};

console.log(incrementDay("2016-05-30T00:00:00Z"));


getNearShows(40.679016, -73.950499, "2016-04-30T00:00:00Z");