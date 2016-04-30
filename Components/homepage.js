var homepage = $('#homepage');
var map = $('#map');
var restart = $('#restart');
var mainButton = $('#mainButton');

$(document).ready(function(){
    var roadtrip = [{
        city:"New York",
        country:"United States Of America",
        date:"2016-04-30",
        latitude:"40.75910030",
        longitude:"-73.98467890",
        name:"An American in Paris (NY)",
        time:"20:00:00",
        url:"http://ticketmaster.com/event/03004F15EE678ED4",
        venue:"Palace Theatre New York"}];

    map.hide();

    mainButton.click(function(){
        map.show();
        homepage.hide();
        showEvents();
    });

    restart.click(function(){
        map.hide();
        $('#events').empty();
        homepage.show();
    });

    var showEvents = function(){
        roadtrip.forEach(function(event){
            $("#events").append("<div class='event'>" +
                "<h3>" + event.name + "</h3>" +
                "<div>Date: " + event.date + " " + event.time + "</div>" +
                "<div>Location: " + event.venue + ", " + event.city + "</div>" +
                "<a href='" +event.url +"'><button type='button'>Buy Tickets</button></a>" +
                "</div>");
        });
    }
});

