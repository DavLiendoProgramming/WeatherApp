const axios = require('axios');
const forecast = require('./forecast');
// Get geolocation

async function geocode(adress) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoiZGxpbmUiLCJhIjoiY2tiOWl4ZTJvMDY5bzJxcjZ1bzg5bnczaSJ9.EjZ6CWo0Bi4aU2aU_c69yg`;
  let res = {};
  //GET url
  if (!adress) {
    return console.log('No address provided');
  }
  await axios
    .get(url)
    .then(async (response) => {
      if (response.data.features.length === 0) {
        console.log('No location found');
      } else {
        const latitude = response.data.features[0].center[1];
        const longitude = response.data.features[0].center[0];
        console.log(
          `Latitude of your request: ${response.data.features[0].center[1]}
             Longitud of your request: ${response.data.features[0].center[0]} 
             Location of your request: ${response.data.features[0].place_name}
             `
        );
      }
      res = response.data.features[0].center;
    })
    .catch((error) => {
      console.log(error);
    });

  return res;
}

module.exports = geocode;
