function Event (eventJson) {
    this.latitude = parseFloat(eventJson.latitude);
    this.longitude = parseFloat(eventJson.longitude);
    this.name = eventJson.name;
    this.city = eventJson.city;
}
