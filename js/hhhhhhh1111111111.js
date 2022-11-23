function _initWeather(data) {
    if (data.status == 200) {
        let message = data.data

        $(".tempature-value").text(message.observe.degree + "℃")
        $(".weather-value").text(message.observe.weather)
        $("#maxDegree").text("↑" + message.forecast_24h["1"].max_degree + "℃")
        $("#minDegree").text("↓" + message.forecast_24h["1"].min_degree + "℃")
        $("#PM2").text(message.air["pm2.5"])

        $(".info-top").eq(0).text(message.observe.humidity)
        $(".info-top").eq(1).text(message.air.aqi)
        $(".info-bttom").eq(1).text("空气" + message.air.aqi_name)
        $(".info-top").eq(2).text(message.observe.wind_power + "级")
        $(".info-top").eq(3).text(message.observe.pressure)

        let forecastInfo = message.forecast_24h
        console.log(forecastInfo);
        $(".weather-bottom").empty()
        for (let index in Object.keys(forecastInfo)) {
            if (index == 0) continue
            let info = forecastInfo[index]

            let timeArr = info.time.split("-")
            timeArr.shift()
            let time = timeArr.join("/")

            $(".weather-bottom").append(`
        <li class="day-weather" id="weather${index}">
          <span class="date">${time}</span>
          <span class="wather">${info.day_weather}</span>
          <div class="dayWather"></div>
          <span class="tempature">↑${info.max_degree}℃</span>
          <span class="wind-directory">${info.day_wind_direction}</span>
          <span class="rank">${info.day_wind_power}级</span>
        </li>
      `)

            switch (info.day_weather) {
                case '晴':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/fine.png">`);
                    break
                case '阴':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/cloudy.png">`);
                    break
                case '多云':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/partly-cloudy.png">`);
                    break
                case '阵雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/shower.png">`);
                    break
                case '雷阵雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/thundershower.png">`);
                    break
                case '雷阵雨伴有冰雹':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/thunderstorm.png">`);
                    break
                case '雨夹雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/sleet.png">`);
                    break
                case '小雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/sprinkle.png">`);
                    break
                case '中雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/moderate.png">`);
                    break
                case '大雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/heavy.png">`);
                    break
                case '暴雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/rainstorm.png">`);
                    break
                case '大暴雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/downpour.png">`);
                case '特大暴雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/rainstormTwo.png">`);
                    break
                case '阵雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/snow.png">`);
                    break
                case '小雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/light.png">`);
                    break
                case '中雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/moderate-snow.png">`);
                    break
                case '大雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/heavy-snow.png">`);
                    break
                case '暴雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/blizzard.png">`);
                    break
                case '雾':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/fog.png">`);
                    break
                case '冻雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/ice-rain.png">`);
                    break
                case '沙尘暴':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/sand-storm.png">`);
                    break
                case '小到中雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/Small-moderate.png">`);
                    break
                case '中到大雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/heavy-rain.png">`);
                    break
                case '大到暴雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/torrential-rain.png">`);
                    break
                case '暴雨到大暴雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/rainstormTwo.png">`);
                    break
                case '大暴雨到特大暴雨':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/torrential-rain.png">`);
                    break
                case '小到中雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/moderate-snowTwo.png">`);
                    break
                case '中到大雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/heavy-snowTwo.png">`);
                    break
                case '大到暴雪':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/snow.png">`);
                    break
                case '浮尘':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/floating-dust.png">`);
                    break
                case '扬沙':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/sand-blowing.png">`);
                    break
                case '强沙尘暴':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/strong-sandstorm.png">`);
                    break
                case '霾':
                    $(`#weather${index} .dayWather`).html(`<img src="/static/img/Intelligent/haze.png">`);
                    break
                default:
                    '出错了天气'
            }
        }
    }
}
