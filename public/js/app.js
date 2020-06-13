console.log('Client side js is loaded');

//Fetching data from same page

const fetching = (address) => {
  msgOne.textContent = 'Loading';
  msgTwo.textContent = '';
  msgThree.textContent = '';
  if (!address) {
    msgOne.textContent = 'You must provide an address';
  }
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.location.length === undefined) {
        msgOne.textContent = 'Location not Found';
      } else {
        msgOne.textContent = `Location: ${data.location}`;
        msgTwo.textContent = `Day Temp: ${data.forecast.temp.day}, Night Temp: ${data.forecast.temp.night}`;
        msgThree.textContent = `Weather for Today: ${data.forecast.weather[0].description}`;
      }
    });
  });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');
const msgThree = document.querySelector('#msg-3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetching(location);
});
