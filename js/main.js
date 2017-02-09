var key = "&APPID=a3cb88d89cc1098cbd4da7e39d1cdf51"; //api key
var api = "http://api.openweathermap.org/data/2.5/weather?q="; //api url
var png = "http://openweathermap.org/img/w/"; //link to icons
var isCelsius = true; //default celsius display
var kelvin; //var to hold raw temp

//HTML
var weather = ".weather-info",
    temp = ".temp",
    focus = "btn-primary",
    notFocus = "btn-default",
    cel = ".celsius",
    fahr = ".fahrenheit";

//Background gifs
var thunderstorm = "https://zippy.gfycat.com/OpenBiodegradableAmericanratsnake.gif",
    drizzle = "https://thumbs.gfycat.com/PartialEachAustraliansilkyterrier-size_restricted.gif",
    rain = "https://thumbs.gfycat.com/GiddyOnlyAmericanwarmblood-size_restricted.gif",
    snow = "https://thumbs.gfycat.com/CalculatingHarmoniousAsp-size_restricted.gif",
    atmosphere = "https://giant.gfycat.com/OffbeatSevereAlaskanhusky.gif",
    clear = "https://giant.gfycat.com/DampHeartfeltCusimanse.gif",
    clouds = "https://thumbs.gfycat.com/AntiqueFocusedHapuka-size_restricted.gif",
    other = "https://thumbs.gfycat.com/EvilMadItaliangreyhound-size_restricted.gif";


//Get city name & run weather data function
$(function(){
    $.getJSON("http://freegeoip.net/json/", function(data){
      console.log(data);
      getWeatherData(data.city, data.country_code);
    });
});

//Retrieves weather data based on city and adds it to the DOM
function getWeatherData(city, country) {
  $.getJSON(api + city + "," + country + key, function(data){
    console.log(data);
    $(weather).append("<h1>" + data.name + ", " + data.sys.country + "</h1>");
    $(weather).append("<h2 style='display: inline;'>" + data.weather[0].main + " </h2><img style='display: inline; padding-bottom: 7px;'src='" + png + data.weather[0].icon + ".png'> ");
    $(weather).append("<h2>" + data.wind.speed + " m/s</h2>");
    $(weather).append("<h2 class='temp'></h2>");
    kelvin = data.main.temp;
    convertToCel();
    updateBackground(data.weather[0].id);
  });
}

//fahrenheit button event listener
$(fahr).click(function(){
  if (isCelsius) {
    convertToFahr();
    changeButtons(cel, fahr);
    isCelsius = false;
  }
});

//celsius button event listener
$(cel).click(function(){
  if (!isCelsius) {
    convertToCel();
    changeButtons(fahr, cel);
    isCelsius = true;
  }
});

//changes the bootstrap button classes
function changeButtons(from, to) {
  $(from).removeClass(focus).addClass(notFocus);
  $(to).addClass(focus).removeClass(notFocus);
}

//converts to celsius and displays it
function convertToCel() {
  $(temp).html((kelvin - 273.15).toFixed(1) + "&#8451");
}

//converts to fahrenheit and displays it
function convertToFahr() {
  $(temp).html(((kelvin/(5/9))-459.67).toFixed(1) + "&#8457");
}

//Updates background with gif based on weather
function updateBackground(id) {
  console.log(id);
  if (id >= 200 && id < 300) {
    changeBackground(thunderstorm); //Thunderstorm
  } else if (id >= 300 && id < 400) {
    changeBackground(drizzle); //Drizzle
  } else if (id >= 500 && id < 600) {
    changeBackground(rain); //Rain
  } else if (id >= 600 && id < 700) {
    changeBackground(snow); //Snow
  } else if (id >= 700 && id < 800) {
    changeBackground(atmosphere); //Atmosphere
  } else if (id === 800) {
    changeBackground(clear); //Clear
  } else if (id > 800 && id < 900) {
    changeBackground(clouds);//Clouds
  } else {
    changeBackground(other); //General
  }
}

//changed background and fades out block div
function changeBackground(url) {
  console.log(url);
  $("body").css('background-image', 'url(' + url + ') ');
  $(".blocker").hide();
}

//Oliver Klingefjord 2017
