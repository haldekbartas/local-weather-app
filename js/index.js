$("document").ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var szerokosc = position.coords.latitude;
      var wysokosc = position.coords.longitude;
      $("#data").html(
        "latitude: " +
          position.coords.latitude +
          "<br>longitude: " +
          position.coords.longitude
      );

      $.get(
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
          szerokosc +
          "&lon=" +
          wysokosc,
        function(data) {
          $(".result").html(data);

          var city = data.name; // The data is an array of posts. Grab the first one.
          var weather = data.weather[0].description;
          var thermo = data.temp;
          var wind = data.wind.speed;

          $("#city").html(city);

         
          $("#weather").append(data.weather[0].main);
          $("#weather").append("<br>" + data.weather[0].description);
          $("#wind").html( wind + " m/s");
          $("#thermometer").attr("src", data.weather[0].icon);

          $("#temps").html(data.main.temp + "°C");

          $("#degree").change(function() {
            if ($("#degree").prop("checked")) {
              $("#temps").html(Math.floor(data.main.temp * 9 / 5 + 32) + "°F");
            } else {
              $("#temps").html(data.main.temp + "°C");
            }
          });

          if (data.main.temp < 3) {
            $("body").css(
              "background-image",
              "url('http://wallpapercave.com/wp/wfiEo9v.jpg')"
            );
          } else if (data.main.temp > 3 && data.main.temp < 20) {
            $("body").css(
              "background-image",
              "url('https://s-media-cache-ak0.pinimg.com/originals/90/2c/4a/902c4a7fe34b7d3a5b99eb010b22b7b4.jpg')"
            );
          } else {
            $("body").css(
              "background-image",
              "url('https://s-media-cache-ak0.pinimg.com/originals/90/2c/4a/902c4a7fe34b7d3a5b99eb010b22b7b4.jpg')"
            );
          }
        }
      );
    });
  }
});