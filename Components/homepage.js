var homepage = $('#homepage');
var mapPanel = $('#mapPanel');
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

    mapPanel.hide();

    mainButton.click(function(){
        mapPanel.show();
        homepage.hide();
    });

    restart.click(function(){
        mapPanel.hide();
        $('#events').empty();
        homepage.show();
    });
});

