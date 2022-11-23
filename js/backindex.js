
var appKey = 'abc8f459e9ed495794eaa54e12379bc9'
var appSecret = '299d8b98cebc6c61df5ad12891dcba2e'
var params = 'appKey=' + appKey + '&appSecret=' + appSecret
var sum = 0


$(function () {

  // 设置时间每秒动态显示
  window.setInterval(function () {
    var time = new Date()
    setTimeout(function () {
      time = time.Format('yyyy-MM-dd hh:mm:ss')
      $('.topleft').children().text(time)
    }, 0)
  }, 1000)

  // 点击跳转到后台管理
  $('#toindex').click(function () {
    window.location.href = '../index.html'
  })

  // 初始化监控视频
  loadXMLDoc()
  // 初始化显示继电器1号信息
  getdevicemessage(1)
  // 获取天气信息
  weather()

  // 切换监控设备
  $('#moniselect').on('change', function () {
    if (sum === 0) {
      sum = 1
    } else {
    }
    var index = Number($(this).val())
    if (index === 1) {
      console.log('风机')
      $('#monimain').removeClass("vary")
      loadXMLDoc();
    } else if (index === 2) {
      console.log('施肥')
      $('#monimain').removeClass("vary")
      reload2();
    } else if (index === 3) {
      console.log('遮阳帘')
      $('#monimain').removeClass("vary")
      reload3();
    } else if (index === 4) {
      console.log('果叶菜')
      $('#monimain').removeClass("vary")
      reload4();
    } else {
      console.log('全部关闭')
      $('#EZUIKitPlayer-monimain').remove()
      $('#monimain').addClass("vary")
    }
  })

  // 继电器信息获取
  $('#relayselect').on('change', function () {
    var did = Number($(this).val())
    getdevicemessage(did)
  })

  // 继电器控制
  $('.relaybox').on('click', 'img', function () {
    var did = Number($('#relayselect').val())
    var code = $(this).parent().index()
    code++
    var str = $(this).attr('src')
    if (str.indexOf('open') != -1) {
      // 开启状态
      var start = 0
    } else {
      // 关闭状态
      var start = 1
    }
    setdevicestatus(code, start, did)
    // console.log(str)
  })
})

// 初始化天气数据
function get_weather(data, source = 'pc', weather_type = 'observe|forecast_1h|forecast_24h|index|alarm|limit|tips|air|rise', callback = '') {
  var address = data.split(',')
  var province = address[0]
  var city = address[1]
  $.ajax({
    url: 'https://wis.qq.com/weather/common',
    type: 'get',
    data: {
      source: source,
      weather_type: weather_type,
      province: province,
      city: city
    },
    dataType: 'jsonp',
    success: function (res) {
      if (res.status == 200 && res.data) {
        //当前天气
        console.log(res)
        var observe = res.data.observe
        var air = res.data.air;
        var forecast_24h = res.data.forecast_24h;
        $('#weather-weather').html(observe.weather)
        $('#weather-pressure').html(observe.pressure)
        $('#weather-temp').html(observe.degree)
        $('#weather-wind_power').html(observe.wind_power)
        $('#weather-humidity').html(observe.humidity)
        $('#weather-maxtemp').html(forecast_24h['1'].max_degree)
        $('#weather-mintemp').html(forecast_24h['1'].min_degree)
        $('#weather-pm').html(air['pm2.5'])
        $('#weather-air').html(air.aqi)
        $('#weather-airname').html(air.aqi_name)
        $(".weather-centerbox2").empty()
        for (let i in Object.keys(forecast_24h)) {
          if (i == 0) continue
          var data = forecast_24h[i]
          var timearr = data.time.split('-')
          timearr.shift()
          var time = timearr.join('/')
          $('.weather-centerbox2').append(`
          <div class="weather-centerboxitem2" id="weather${i}">
          <div><span>${time}</span></div>
          <div><span>${data.day_weather}</span></div>
          <div class="dayWather"></div>
          <div><span>↑</span><span>${data.max_degree}</span><span>℃</span></div>
          <div><span>${data.day_wind_direction}</span></div>
          <div><span>${data.day_wind_power}</span><span>级</span></div>
         </div>
          `)
          switch (data.day_weather) {
            case '晴':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/fine.png">`);
                    break
                case '阴':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/cloudy.png">`);
                    break
                case '多云':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/partly-cloudy.png">`);
                    break
                case '阵雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/shower.png">`);
                    break
                case '雷阵雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/thundershower.png">`);
                    break
                case '雷阵雨伴有冰雹':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/thunderstorm.png">`);
                    break
                case '雨夹雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/sleet.png">`);
                    break
                case '小雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/sprinkle.png">`);
                    break
                case '中雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/moderate.png">`);
                    break
                case '大雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/heavy.png">`);
                    break
                case '暴雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/rainstorm.png">`);
                    break
                case '大暴雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/downpour.png">`);
                case '特大暴雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/rainstormTwo.png">`);
                    break
                case '阵雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/snow.png">`);
                    break
                case '小雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/light.png">`);
                    break
                case '中雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/moderate-snow.png">`);
                    break
                case '大雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/heavy-snow.png">`);
                    break
                case '暴雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/blizzard.png">`);
                    break
                case '雾':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/fog.png">`);
                    break
                case '冻雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/ice-rain.png">`);
                    break
                case '沙尘暴':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/sand-storm.png">`);
                    break
                case '小到中雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/Small-moderate.png">`);
                    break
                case '中到大雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/heavy-rain.png">`);
                    break
                case '大到暴雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/torrential-rain.png">`);
                    break
                case '暴雨到大暴雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/rainstormTwo.png">`);
                    break
                case '大暴雨到特大暴雨':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/torrential-rain.png">`);
                    break
                case '小到中雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/moderate-snowTwo.png">`);
                    break
                case '中到大雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/heavy-snowTwo.png">`);
                    break
                case '大到暴雪':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/snow.png">`);
                    break
                case '浮尘':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/floating-dust.png">`);
                    break
                case '扬沙':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/sand-blowing.png">`);
                    break
                case '强沙尘暴':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/strong-sandstorm.png">`);
                    break
                case '霾':
                    $(`#weather${i} .dayWather`).html(`<img src="./image/haze.png">`);
                    break
                default:
                    '出错了天气'
          }
        }
      }
    }
  });
}

//天气方法
function weather() {
  $.ajax({
    url: 'https://wis.qq.com/city/like',
    type: 'get',
    data: {
      source: 'pc',
      province: '上海市',
      city: '上海市',
    },
    dataType: 'jsonp',
    success: function (res) {
      if (res.status == 200 && res.data) {
        for (var key in res.data) { //遍历接口
          get_weather(res.data[key]);
        }
      }
    }
  });
}

// 设备状态修改
function setdevicestatus(code, start, did) {
  var data = {}
  data = {
    code: code,
    start: start,
    did: did
  }
  $.ajax({
    url: 'http://192.168.0.155:3700/api/OpenCloseOut',
    type: 'post',
    data: JSON.stringify(data),
    contentType: 'application/json;charset=UTF-8',
    success: function (res) {
      getdevicemessage(did)
    }

  })
}

// 设备状态显示
function getdevicemessage(equipid) {
  var data = {}
  var str = ''
  data = {
    did: equipid,
  }
  $('.relaybox-center').html('')
  $.ajax({
    url: 'http://192.168.0.155:3700/api/FindNode',
    type: 'post',
    data: JSON.stringify(data),
    contentType: 'application/json;charset=UTF-8',
    success: function (res) {
      for (let i = 0; i < res.length; i++) {
        str += `
                 <div class="relaybox-centeritem">
                 <span>设备名称：</span>
                 <span>${res[i].name}</span>
                 <img src="./image/relayopen.png" class="cursor ${res[i].start === 1 ? '' : 'hidden'}">
                 <img src="./image/relayclose.png" class="cursor ${res[i].start === 1 ? 'hidden' : ''}">
             </div>
                `
      }
      $('.relaybox-center').append(str)
    }

  })
}


// 监控画面获取函数模板
function getmonitemplate(url) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp = new XMLHttpRequest();
  }
  else {
    // IE6, IE5 浏览器执行代码
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = JSON.parse(xmlhttp.response.toString());
      var token = myArr.data.accessToken;
      var playr = new EZUIKit.EZUIKitPlayer({
        id: 'monimain', // 视频容器ID  //shifei
        accessToken: token,
        url: url,
        template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
        autoplay: true,
        // 视频上方头部控件
        //header: ['capturePicture','save','zoom'],            // 如果templete参数不为simple,该字段将被覆盖
        // 视频下方底部控件
        //footer: ['talk','broadcast','hd','fullScreen'],      // 如果template参数不为simple,该字段将被覆盖
        audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
        plugin: ['talk'],                       // 加载插件，talk-对讲
        openSoundCallBack: (data) => console.log("开启声音回调", data),
        closeSoundCallBack: (data) => console.log("关闭声音回调", data),
        startSaveCallBack: (data) => console.log("开始录像回调", data),
        stopSaveCallBack: (data) => console.log("录像回调", data),
        capturePictureCallBack: (data) => console.log("截图成功回调", data),
        fullScreenCallBack: (data) => console.log("全屏回调", data),
        getOSDTimeCallBack: (data) => console.log("获取OSDTime回调", data),
        handleSuccess: (data) = function () { console.log("播放成功回调", data) },
        handleError: (data) => console.log("播放失败回调", data),
        width: 400,
        height: 250,
      })


    }
  }

  xmlhttp.open("post", "https://open.ys7.com/api/lapp/token/get");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  xmlhttp.send(params)

}

function reload2() {
  $('#EZUIKitPlayer-monimain').remove()
  getmonitemplate("ezopen://open.ys7.com/F96424179/1.hd.live")
}


function reload3() {
  $('#EZUIKitPlayer-monimain').remove()
  getmonitemplate("ezopen://open.ys7.com/G38369112/1.hd.live")
}

function reload4() {
  $('#EZUIKitPlayer-monimain').remove()
  getmonitemplate("ezopen://open.ys7.com/F96424238/1.hd.live")
}

function loadXMLDoc() {
  if (sum != 0) {
    $('#EZUIKitPlayer-monimain').remove()
  } else {

  }
  getmonitemplate('ezopen://open.ys7.com/J31908110/1.hd.live')
}
