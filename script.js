$(document).ready(function() {
    let prevCities = [];

    function renderPrevCities() {
        $("#prev-cities").empty();
        for (let i=0; i<prevCities.length; i++) {
            let cityRow = $("<div>");
            cityRow.attr("class", "row");
            let cityCol = $("<div>");
            cityCol.attr("class", "col-sm-12");
            let button = $("<button>");
            button.attr("class", "prev-city");
            button.attr("data-value", prevCities[i]);
            button.text(prevCities[i]);
            $("#prev-cities").prepend(cityRow);
            cityRow.append(cityCol);
            cityCol.append(button);
        }
    };

    function getWeather(location) {
        let APIKey = "b289af46fb389f130dbb6ff895414999";
        let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + APIKey;
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=" + APIKey;
        let today = moment().format('L');

        $.ajax({
            url: currentURL,
            method: "GET"
        }).then(function(response) {
            $('#current-city').text(response.name + " " + "(" + today + ")");
            $('#current-icon').text("http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            $('#current-temp').text("Current Temp: "+ response.main.temp);
            $('#current-humid').text("Current Humidity: " + response.main.humidity + "%");
            $('#current-wind').text("Current Wind Speed: " + response.wind.speed);
            let city = response.name;
            prevCities.push(city);
            renderPrevCities();
        });

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            $("#five-day-title-div").empty();
            console.log(response);
            let fiveDayTitleDiv = $('#five-day-title-div');
            let fiveDayTitle = $("<h2>").text("5 Day Forecast");
            fiveDayTitle.attr("id", "five-day-title");
            fiveDayTitleDiv.append(fiveDayTitle);
            for (let i=0; i<6; i++) {
                $(`#day-${[i]}`).text(response.date);
                $(`#day-${[i]}-cond`).text(response.list[i].weather[0].main);
                $(`#day-${[i]}-temp`).text(response.list[i].main.temp);
                $(`#day-${[i]}-humid`).text(response.list[i].main.humidity + "%");
            };
        });
    };

    $('#search').on('click', function() {
        let location = $('#location').val();
        getWeather(location);
    });

    $(document).on('click', '.prev-city', function() {
        let location = $(this).attr('data-value');
        getWeather(location);
    });
});