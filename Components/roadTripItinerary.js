function roadTripItinerary () {

    this.events = [];

    this.setEventList = function(showListJson){
        for(ctr = 0; ctr < showListJson.length; ctr++){
            var event = new Event(showListJson[ctr]);
            this.events.push(event);
        }
    }

    this.addAllEventToMap = function(){
        for(ctr = 0; ctr < this.events.length; ctr++)
            addEventToMap(this.events[ctr]);
    }
}
