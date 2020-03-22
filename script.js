$(document).ready(() => {
    
    prevCities = [];

    init();

    function init() {
        let savedButtons = JSON.parse(localStorage.getItem("saved"));
        if (savedButtons !== null) {
            prevCities = savedButtons;
        }
        renderPrevCities();
    }

    function savedCities() {
        localStorage.setItem("saved", JSON.stringify(prevCities));
    }

    function renderPrevCities() {
        $('#prev-cities').empty();
        for (let i=0; i<prevCities.length; i++) {
            let cityRow = $("<div>");
            cityRow.attr("class", "row");
            let cityCol = $("<div>");
            cityCol.attr("class", "col-sm-12");
            let button = $("<button>");
            button.attr("class", "prev-city btn btn-warning mt-1 mb-1");
            button.attr("data-value", prevCities[i]);
            button.text(prevCities[i]);
            $("#prev-cities").prepend(cityRow);
            cityRow.append(cityCol);
            cityCol.append(button);
        }
    };

    function getWeather(location) {
        let APIKey = "b289af46fb389f130dbb6ff895414999";
        let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&APPID=" + APIKey;
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=" + APIKey;
        let today = moment().format('L');

        $('#location').val("");
        $.ajax({
            url: currentURL,
            method: "GET"
        }).then((response) => {
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + APIKey; 
            $('#current-city').text(response.name + " " + "(" + today + ")");
            $('#current-icon').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`);
            $('#current-temp').text("Current Temp: "+ Math.round(response.main.temp) + "°F");
            $('#current-humid').text("Current Humidity: " + response.main.humidity + "%");
            $('#current-wind').text("Current Wind Speed: " + Math.round(response.wind.speed) + " mph");
            if (jQuery.inArray(response.name, prevCities) === -1) {
                let city = response.name;
                prevCities.push(city);
                savedCities();
                renderPrevCities();
            }
            //code to grab UV index
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then((response) => {
                let uvDiv = $('#uv');
                let uv = response.value.toFixed(1);
                if (uv <= 2.9) {
                    uvDiv.attr("style", "color: green;")
                } else if (uv >= 3.0 && uv <= 5.9) {
                    uvDiv.attr("style", "color: gold;")
                } else if (uv >= 6.0 && uv <= 7.9) {
                    uvDiv.attr("style", "color: orange;")
                } else if (uv >= 8.0 && uv <= 10.9) {
                    uvDiv.attr("style", "color: red;")
                } else {
                    uvDiv.attr("style", "color: purple;")
                }
                uvDiv.text('UV Index: ' + uv);
            });
        });

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then((response) => {
            $("#five-day-title-div").empty();
            let fiveDayTitleDiv = $('#five-day-title-div');
            let fiveDayTitle = $("<h3>").text("5 Day Forecast");
            fiveDayTitle.attr("id", "five-day-title");
            fiveDayTitleDiv.append(fiveDayTitle);
            $(`#day-1`).text(moment().add(1, "days").format("L"));
            $(`#day-1-cond`).attr('src', `https://openweathermap.org/img/wn/${response.list[5].weather[0].icon}.png`);
            $(`#day-1-temp`).text("Temp: " + Math.round(response.list[5].main.temp) + "°F");
            $(`#day-1-humid`).text("Humid: " + response.list[5].main.humidity + "%");
            $(`#day-2`).text(moment().add(2, "days").format("L"));
            $(`#day-2-cond`).attr('src', `https://openweathermap.org/img/wn/${response.list[13].weather[0].icon}.png`);
            $(`#day-2-temp`).text("Temp: " + Math.round(response.list[13].main.temp) + "°F");
            $(`#day-2-humid`).text("Humid: " + response.list[13].main.humidity + "%");
            $(`#day-3`).text(moment().add(3, "days").format("L"));
            $(`#day-3-cond`).attr('src', `https://openweathermap.org/img/wn/${response.list[21].weather[0].icon}.png`);
            $(`#day-3-temp`).text("Temp: " + Math.round(response.list[21].main.temp) + "°F");
            $(`#day-3-humid`).text("Humid: " + response.list[21].main.humidity + "%");
            $(`#day-4`).text(moment().add(4, "days").format("L"));
            $(`#day-4-cond`).attr('src', `https://openweathermap.org/img/wn/${response.list[29].weather[0].icon}.png`);
            $(`#day-4-temp`).text("Temp: " + Math.round(response.list[29].main.temp) + "°F");
            $(`#day-4-humid`).text("Humid: " + response.list[29].main.humidity + "%");
            $(`#day-5`).text(moment().add(5, "days").format("L"));
            $(`#day-5-cond`).attr('src', `https://openweathermap.org/img/wn/${response.list[37].weather[0].icon}.png`);
            $(`#day-5-temp`).text("Temp: " + Math.round(response.list[37].main.temp) + "°F");
            $(`#day-5-humid`).text("Humid: " + response.list[37].main.humidity + "%");
        });
    };

    $('#search').on('click', () => {
        let location = $('#location').val();
        getWeather(location);
    });

    $(document).on('click', '.prev-city', function() {
        let location = $(this).attr('data-value');
        getWeather(location);
    });
});