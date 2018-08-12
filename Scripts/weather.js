/// <reference path="jquery-3.1.1.js" />
/// <reference path="weatherIcons.js" />

$(document).ready(function () {
    $('#weatherIcon').html("<i class='fa fa-spinner fa-pulse' aria-hidden='true'></i>")
    //showWeather("Trying to determine your location...");
    $('#conditions').html("Loading...");
    getLocation();
    $('#units').on('click', convert);
});

function supportsGeolocation() {
    return 'geolocation' in navigator;
}

function showWeather(city, temp, tempLo, tempHi, conditions, icon, id) {
    //$('#display').html("City: " + city + "<br />Temp: " + temp + "<br />High: " + tempHi + "<br/>Low: " + tempLo + "<br />Conditions: " + conditions + "<br />icon: " + icon);
    $('#city').html(city);
    $('#weatherIcon').html("<i class='" + icon + "'</i>");
    $('#temp').html(temp);
    $('#conditions').html(conditions);
    $('#high').html(tempHi);
    $('#low').html(tempLo);

    
    if (id <= 531) {
        $(".boxxed").css("background", "url('Images/weather/thunderstorm.svg') no-repeat center");
        $(".boxxed").css("background-size", "cover");
    } else if (id > 531 && id <= 622) {
        $(".boxxed").css("background", "url('Images/weather/snow.svg') no-repeat center");
        $(".boxxed").css("background-size", "cover");
    } else if (id == 800 || id == 951) {
        $(".boxxed").css("background", "url('Images/weather/sunny.svg') no-repeat center");
        $(".boxxed").css("background-size", "cover");
    } else {
        $(".boxxed").css("background", "url('Images/weather/cloudy.svg') no-repeat center");
        $(".boxxed").css("background-size", "cover");
    };

}

function getLocation() {
    if (supportsGeolocation()) {
        var options = {
            timeout: 12000,
            maximumAge: 20000
        };
        navigator.geolocation.getCurrentPosition(getWeather, showError, options);
    }
    else {
        showWeather("Geolocation is not supported by this browser.");
    }
}

function getWeather(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var prefix = 'wi wi-';
    var datetime = new Date(position.timestamp).toLocaleString();

    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&APPID=b9f7303fb0d0ff58197927d8f26a6df7", function (data) {
        var city = data.name,
            temp = Math.round(data.main.temp),
            tempLo = Math.round(data.main.temp_min),
            tempHi = Math.round(data.main.temp_max),
            conditions = data.weather[0].main,
            id = data.weather[0].id,
            prefix = 'wi wi-',
            icon = weatherIcons[id].icon;
                
        if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
            icon = prefix + 'day-' + icon;
        } else {
            icon = prefix + 'night-' + icon;
        }
        
        showWeather(city, temp, tempLo, tempHi, conditions, icon, id);
    });
}

//function showPosition(position) {
//    var datetime = new Date(position.timestamp).toLocaleString();
//    showWeather("Latitude: " + position.coords.latitude + "<br />"
//        + "Longitude: " + position.coords.longitude + "<br />"
//        + "Timestamp: " + datetime);
//}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showWeather("User denied Geolocation access request.");
            break;
        case error.POSITION_UNAVAILABLE:
            showWeather("Location information is not available.");
            break;
        case error.TIMEOUT:
            showWeather("Get user location request timed out.");
            break;
        case error.UNKNOWN_ERROR:
            showWeather("An unexpected error occured.");
            break;
    }
}

function convert() {
    
    var x = Number($('#temp').html());
    var hi = Number($('#high').html());
    var lo = Number($('#low').html());
    var u = $('#units').html();

    if (u == "F") {
        x = Math.round(((x - 32) * 5) / 9);
        hi = Math.round(((hi - 32) * 5) / 9);
        lo = Math.round(((lo - 32) * 5) / 9);
        $('#temp').html(x);
        $('#units').html("C");
        $('#high').html(hi);
        $('#low').html(lo);
    } else {
        x = Math.round(((x * 9) / 5) + 32);
        hi = Math.round(((hi * 9) / 5) + 32);
        lo = Math.round(((lo * 9) / 5) + 32);
        $('#temp').html(x);
        $('#units').html("F");
        $('#high').html(hi);
        $('#low').html(lo);
    }
    //Deduct 32, then multiply by 5, then divide by 9
    //Multiply by 9, then divide by 5, then add 32
}

//http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=b9f7303fb0d0ff58197927d8f26a6df7