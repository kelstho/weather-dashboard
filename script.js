$('#search').on('click', function() {
    let location = $('#location').val();
    let APIKey = "b289af46fb389f130dbb6ff895414999";
    let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + APIKey;
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=" + APIKey;
    let today = moment().format('L');

    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $('#current-city').text(response.name + " " + "(" + today + ")");
        $('#current-icon').text("http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $('#current-temp').text("Current Temp: "+ response.main.temp);
        $('#current-humid').text("Current Humidity: " + response.main.humidity + "%");
        $('#current-wind').text("Current Wind Speed: " + response.wind.speed);
    });
    
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        let fiveDayTitleDiv = $('#five-day-title-div');
        let fiveDayTitle = $("<h2>").text("5 Day Forecast");
        fiveDayTitle.attr("id", "five-day-title");
        fiveDayTitleDiv.append(fiveDayTitle);
        $('#day-1').text(response.date);
        $('#day-1-cond').text(response.list[0].weather[0].main);
        $('#day-1-temp').text(response.list[0].main.temp);
        $('#day-1-humid').text(response.list[0].main.humidity + "%");
        $('#day-2').text(response.date);
        $('#day-2-cond').text(response.list[1].weather[0].main);
        $('#day-2-temp').text(response.list[1].main.temp);
        $('#day-2-humid').text(response.list[1].main.humidity + "%");
        $('#day-3').text(response.date);
        $('#day-3-cond').text(response.list[2].weather[0].main);
        $('#day-3-temp').text(response.list[2].main.temp);
        $('#day-3-humid').text(response.list[2].main.humidity + "%");
        $('#day-4').text(response.date);
        $('#day-4-cond').text(response.list[3].weather[0].main);
        $('#day-4-temp').text(response.list[3].main.temp);
        $('#day-4-humid').text(response.list[3].main.humidity + "%");
        $('#day-5').text(response.date);
        $('#day-5-cond').text(response.list[4].weather[0].main);
        $('#day-5-temp').text(response.list[4].main.temp);
        $('#day-5-humid').text(response.list[4].main.humidity + "%");
    });
});