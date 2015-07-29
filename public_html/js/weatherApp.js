/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$(document).ready(function () {
    $("#weatherInfo").hide();
    $(".citynamefield").hide();
    $(".zipcodefield").hide();
var pref;
    $(".preference").click(function () {
        pref = $('input:radio[name=pref]:checked').val();

        if (pref === "cityname") {
            $(".citynamefield").show();
            $(".zipcodefield").hide();
        }
        else {
            $(".zipcodefield").show();
            $(".citynamefield").hide();
        }
    });

    $("#getInfo").click(function () {

        var cname = $("#cname").val();
        var zipcode = $("#zipcode").val();
        var format = $('input:radio[name=optradio]:checked').val();

        var getParam;
        if (pref === "zipcode") {
            getParam = zipcode;
            $.ajax({
                dataType: "json",
                url: "http://api.openweathermap.org/data/2.5/weather",
                data: {
                    zip: getParam + ',' + 'us'
                },
                success: function (result) {
                    $("#weatherInfo").slideDown(3000);
                    var weatherObj = result;
                    var w = weatherObj.weather;
                    var weather_main = w[0].main;
                    var icon = w[0].icon;
                    var imgicon = "http://openweathermap.org/img/w/" + icon + ".png";
                    $("#weatherMain").text("Weather: " + weather_main);
                    $("img").attr("src", imgicon);
                    var main = weatherObj.main;
                    if (format === "Kelvin") {
                        var max_temp = main.temp_max;
                        var min_temp = main.temp_min;
                    } else if (format === "Celsius") {
                        var max_temp = getCelcius(main.temp_max);
                        var min_temp = getCelcius(main.temp_min);
                    }
                    else {
                        var max_temp = getFahraneit(main.temp_max);
                        var min_temp = getFahraneit(main.temp_min);
                    }
                    $("#weatherTempMax").text("Max: " + max_temp + "      ");
                    $("#weatherTempMin").text("Min: " + min_temp);

                    var wind = weatherObj.wind;
                    var wind_speed = wind.speed;
                    var wind_degree = wind.deg;
                    $("#windSpeed").text("Speed: " + wind_speed + "      ");
                    $("#windDegree").text("Degree: " + wind_degree);
                }});
            
            $("#cname").val("");

        }
        else {
            getParam = cname;
            $.ajax({
                dataType: "json",
                url: "http://api.openweathermap.org/data/2.5/weather",
                data: {
                    q: getParam
                },
                success: function (result) {
                    $("#weatherInfo").slideDown(3000);
                    var weatherObj = result;
                    var w = weatherObj.weather;
                    var weather_main = w[0].main;
                    var icon = w[0].icon;
                    var imgicon = "http://openweathermap.org/img/w/" + icon + ".png";
                    $("#weatherMain").text("Weather: " + weather_main);
                    $("img").attr("src", imgicon);
                    var main = weatherObj.main;
                    if (format === "Kelvin") {
                        var max_temp = main.temp_max;
                        var min_temp = main.temp_min;
                    } else if (format === "Celsius") {
                        var max_temp = getCelcius(main.temp_max);
                        var min_temp = getCelcius(main.temp_min);
                    }
                    else {
                        var max_temp = getFahraneit(main.temp_max);
                        var min_temp = getFahraneit(main.temp_min);
                    }

                    $("#weatherTempMax").text("Max: " + max_temp + "      ");
                    $("#weatherTempMin").text("Min: " + min_temp);

                    var wind = weatherObj.wind;
                    var wind_speed = wind.speed;
                    var wind_degree = wind.deg;
                    $("#windSpeed").text("Speed: " + wind_speed + "      ");
                    $("#windDegree").text("Degree: " + wind_degree);
                }});

            $("#zipcode").val("");
        }

    });

});
function getCelcius(x) {
    var kelvin = x;
    var celcius = kelvin - 273.15;
    return celcius;
}

function getFahraneit(x) {
    var kelvin = x;
    var f = (kelvin * 9 / 5) - (459.67);
    return f;
}