const axios = require('axios');
const KEY = 'd9e1fcbe78f17f0d5867c92f6711570e';
const geocode = require('./geocode');

//Get forecast from a geolocation

async function forecast(adress) {
  const location = await geocode(adress);

  let lat = location[1];
  let long = location[0];
  let res = { location };
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&units=metric&appid=${KEY}`;
  await axios
    .get(url)
    .then((response) => {
      if (response.data.daily.length === 0) {
        console.log('No forecast found');
      } else {
        console.log(response.data.daily[0], 'Hi im forecast');
        res.forecast = response.data.daily[0];
      }
    })
    .catch((error) => console.log(error));
  return res;
}

module.exports = forecast;
