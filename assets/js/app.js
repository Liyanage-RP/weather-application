console.log("Weather App Loaded");

const input = document.querySelector(".header_right_side input");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        getWeather(input.value.trim());
    }
});

function getWeather(city) {

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const apiKey = "fe2313355bee41d395d95910251611";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.error) {
                alert("City not found!");
                return;
            }

            console.log(data);

            document.getElementById("city_name").innerText = data.location.name;
            document.getElementById("country_name").innerText = data.location.country;

            document.getElementById("main_temparature").innerHTML =
                data.current.temp_c + " <span>℃</span>";

            document.getElementById("sub_main_temparature").innerHTML =
                data.current.temp_f + " <span>°F</span>";

            document.getElementById("temparature_feel_like").innerHTML =
                data.current.feelslike_c + " <span>℃</span>";

            document.getElementById("status").innerText =
                data.current.condition.text;

            document.getElementById("date").innerText =
                data.location.localtime;

            document.getElementById("main_status_image").src =
                "https:" + data.current.condition.icon;

            document.getElementById("wind_speed_value").innerHTML =
                data.current.wind_kph + "<span> km/h</span>";

            document.getElementById("humidity_value").innerHTML =
                data.current.humidity + "<span>%</span>";

            document.getElementById("cloud_cover_value").innerHTML =
                data.current.cloud + "<span>%</span>";

            document.getElementById("uv_index_value").innerHTML =
                data.current.uv;

            document.getElementById("pressure_value").innerHTML =
                data.current.pressure_mb + "<span> hPa</span>";

            document.getElementById("visibility_value").innerHTML =
                data.current.vis_km + "<span> km</span>";

            const astro = data.forecast.forecastday[0].astro;

            document.getElementById("sun_rise_time").innerText = astro.sunrise;
            document.getElementById("sun_set_time").innerText = astro.sunset;

        })
        .catch(err => {
            alert("Something went wrong!");
            console.error(err);
        });
}
