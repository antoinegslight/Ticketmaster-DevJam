$(document).ready(function () {

    var baseurl = "https://app.ticketmaster.com/discovery/v2/events.json";
    var apikey = "apikey=sRltQrA6oDxZQG1hjFAE0ioGlHjJGGL9";
    var startDateTime = "startDateTime=2016-04-30T00:00:00Z";
    var postalCode = "postalCode=G1E4L7";
    var radius = "radius=25";
    var unit = "unit=km";
    var roadTrip = [];

    var getEvents = function(duration, iteration, latitude, longitude){
      var latlong = "latlong=" + latitude + "," + longitude;
      $.ajax({
          type:"GET",
          url: baseurl + "?" + apikey + "&" + startDateTime + "&" + latlong,
          async:true,
          dataType: "json",
          success: function(res) {
              //console.log(res);
              setNextEvent(res._embedded.events);
              if (iteration < duration){
                getEvents(duration, iteration++,
                          roadTrip[roadTrip.length-1].latitude,
                          roadTrip[roadTrip.length-1].longitude);
              }
          },
          error: function(xhr, status, err) {
              // This time, we do not end up here!
          }
      });
    }

    var planRoadTrip = function(duration, latitude, longitude){

      getEvents(duration, 0, latitude, longitude);
    }

    var showEvents = function(events){
      $.each(events, function( index, event ) {
          console.log( index + ": " + event.name );
      });
    }

    var setNextEvent = function(events){
      var eventPosition = Math.floor((Math.random() * 20) + 1);
      var unformatedEvent = events[eventPosition];
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
      console.log(event);
      roadTrip.push(event);
    }

    planRoadTrip(6, 46.813274, -71.212147);
});
