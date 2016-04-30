$(document).ready(function () {

    var baseurl = "https://app.ticketmaster.com/discovery/v2/events.json";
    var apikey = "apikey=sRltQrA6oDxZQG1hjFAE0ioGlHjJGGL9";
    var radius = "radius=300";
    var roadTrip = [];

    var getEvents = function(date, duration, iteration, latitude, longitude){

      var latlong = "latlong=" + latitude + "," + longitude;
      var starTime = "startDateTime=" + date;
      var endTime = "endDateTime=" + incrementDay(date);

      $.ajax({
          type:"GET",
          url: baseurl + "?" + apikey + "&" + latlong + "&" + radius + "&" + starTime + "&" + endTime,
          async:true,
          dataType: "json",
          success: function(res) {
              if(typeof(res._embedded.events) != "undefined"){
                setNextEvent(res._embedded.events);
                if (iteration < duration) {
                    iteration++;
                    getEvents(incrementDay(date), duration, iteration,
                        roadTrip[roadTrip.length - 1].latitude,
                        roadTrip[roadTrip.length - 1].longitude);
                }
                else{
                    var myItinerary = new roadTripItinerary();
                    myItinerary.setEventList(roadTrip);
                    myItinerary.addAllEventToMap();
                    showEvents();
                }
              } else {
                console.log("No roadtrip possible for this date and/or this city")
                //getEvents(incrementDay(date), duration, iteration, latitude, longitude;
              }

          },
          error: function(xhr, status, err) {
              // This time, we do not end up here!
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

    var planRoadTrip = function(startDate, duration, latitude, longitude){
      getEvents(startDate, duration, 0, latitude, longitude);
    };

    var showEvents = function(){
        roadTrip.forEach(function(event){
            $("#events").append("<div class='event'>" +
                "<h3>" + event.name + "</h3>" +
                "<div>Date: " + event.date + " " + event.time + "</div>" +
                "<div>Location: " + event.venue + ", " + event.city + "</div>" +
                "<a href='" +event.url +"'><button type='button'>Buy Tickets</button></a>" +
                "</div>");
        });
    };

    var setNextEvent = function(events){
      var eventPosition = Math.floor((Math.random() * 20) + 1);
      var unformatedEvent = events[eventPosition];

      if(typeof(unformatedEvent) != "undefined"){
        var event = {
          name: unformatedEvent.name,
          date: unformatedEvent.dates.start.localDate,
          time: unformatedEvent.dates.start.localTime,
          country: unformatedEvent._embedded.venues[0].country.name,
          city: unformatedEvent._embedded.venues[0].city.name,
          venue: unformatedEvent._embedded.venues[0].name,
          longitude: unformatedEvent._embedded.venues[0].location.longitude,
          latitude: unformatedEvent._embedded.venues[0].location.latitude,
          url: unformatedEvent.url
        };
        roadTrip.push(event);
     } else {
       console.log("Event is undefined");
     }
    };

    var startDate = "2016-04-30T00:00:00Z";
    planRoadTrip(startDate, 3, 40.679016, -73.950499);
    console.log(roadTrip);
});
