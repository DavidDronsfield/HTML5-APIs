var totalDistance = 0.0;
var lastLat;
var lastLong;

function updateErrorStatus(message) {
	document.getElementById("status").style.background = "papayaWhip";
	document.getElementById("status").innerHTML = "<strong>Error</strong>: " + message;
}

function updateStatus(message) {
	document.getElementById("status").style.background = "paleGreen";
	document.getElementById("status").innerHTML = message;
}

function handleLocationError(error) {
	switch(error.code) {
		case 0:
			updateErrorStatus("There was an error whilst retrieving your location. Additional details: " + error.message);
			break;
		case 1:
			updateErrorStatus("The user opted not to share their location.");
			break;
		case 2:
			updateErrorStatus("The browser was unable to determine your location. Additional details: " + error.message);
			break;
		case 3:
			updateErrorStatus("The browser timed out before retreiving the location.");
			break;
	}
}

Number.prototype.toRadians = function() {
	return this * Math.PI / 180;
}
    
function distance(latitude1, longitude1, latitude2, longitude2) {
// R is the radius of the earth in kilometers
	var R = 6371;
      
    var deltaLatitude = (latitude2-latitude1).toRadians();
    var deltaLongitude = (longitude2-longitude1).toRadians();
    latitude1 = latitude1.toRadians(), latitude2 = latitude2.toRadians();

    var a = Math.sin(deltaLatitude/2) *
            Math.sin(deltaLatitude/2) +
            Math.cos(latitude1) *
            Math.cos(latitude2) *
            Math.sin(deltaLongitude/2) *
            Math.sin(deltaLongitude/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function updateLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;
	var timestamp = position.timestamp;

	document.getElementById("latitude").innerHTML = "Lattitude: " + latitude;
	document.getElementById("longitude").innerHTML = "Longitude: " + longitude;
	document.getElementById("accuracy").innerHTML = "Accuracy: To within " + accuracy + "m.";
	document.getElementById("timestamp").innerHTML = "timestamp: " + timestamp;

	if (accuracy >= 500) {
		updateStatus("Need more accurate values to calculate distance.");
		return;
	}

	//calculate distance

    if ((lastLat != null) && (lastLong != null)) {
    	var currentDistance = distance(latitude, longitude, lastLat, lastLong);
    	document.getElementById("currDist").innerHTML = "Distance traveled since last update: " + currentDistance.toFixed(4) + " km";

    	totalDistance += currentDistance;
    	document.getElementById("totalDist").innerHTML = "Total distance traveled: " + totalDistance.toFixed(4) + " km";
    }


    lastLat = latitude;
    lastLong = longitude;

    updateStatus("Location successfully updated.");
}

function loadDemo() {
	if(navigator.geolocation) {
		document.getElementById("status").innerHTML = "Geolocation is supported by your browser.";
		navigator.geolocation.watchPosition(updateLocation, handleLocationError, {maximumAge: 20000});
	} else {
		document.getElementById("status").innerHTML = "Geolocation is not supported by your browser.";
	}
}