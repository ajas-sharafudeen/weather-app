//Example fetch
document.querySelector('#searchButton').addEventListener('click', getFetch)

function getFetch() {
  const location = document.querySelector('#locationInput').value.toLowerCase()
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=efe10616d80ccc2b8d421a5760d03baf`

  fetch(geoUrl)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('#state').innerText = `State: ${data[0].state}`
      document.querySelector('#country').innerText = `Country: ${data[0].country}`
      document.querySelector('#latitude').innerText = `Latitude: ${data[0].lat}`
      document.querySelector('#longitude').innerText = `Longitude: ${data[0].lon}`
      const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=efe10616d80ccc2b8d421a5760d03baf&units=metric`
      return fetch(forecastUrl);
    })
    .then(res => res.json()) // parse forecast response as JSON
    .then(forecastData => {
      console.log(forecastData);
      // Update your UI with forecast data here
      const temp = forecastData.list[0].main.temp
      const feelsLike = forecastData.list[0].main.feels_like
      const humidity = forecastData.list[0].main.humidity
      const forecastTime = forecastData.list[0].dt
      document.querySelector('#currentTemp').innerText = `Current Temperature: ${temp}`
      document.querySelector('#feelsLike').innerText = `Feels Like: ${feelsLike}`
      document.querySelector('#humidity').innerText = `Humidity: ${humidity}`

      function convertEpochToGMT(epoch) {
        const date = new Date(epoch * 1000); // Convert seconds to milliseconds
        const dateString = date.toGMTString(); // Convert date to GMT string
        return dateString;
      }
      
      const epochTime = forecastTime;
      const gmtTime = convertEpochToGMT(epochTime);
      document.querySelector('#forecastedTime').innerHTML = `Last Forecast: ${gmtTime}`
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

