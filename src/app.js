const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
//Define paths for Express config

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// const aboutPath = path.join(publicPath, 'about.html');
// const helpPath = path.join(publicPath, 'help.html');

//Setup handlebars angine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve

app.use(express.static(publicPath));
app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'My Name' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'David Liendo' });
});
app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', msg: "Please Help I'm in venezuela" });
});
// app.use('/about', express.static(aboutPath));
// app.use('/help', express.static(helpPath));
app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  let fore = await forecast(req.query.address);
  if (fore.location.length === 0) {
    res.send({ error: 'Location not found' });
  }
  res.send({
    address: req.query.address,
    location: fore.location,
    forecast: fore.forecast,
  });
});
app.get('/products', (req, res) => {
  console.log(req.query);
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', { title: 'Error: 404', msg: 'Help Article Not found' });
});
app.get('*', (req, res) => {
  res.render('404', { title: 'Error: 404', msg: 'Page not Found' });
});

app.listen(3000, () => {
  console.log('Running server on port 3000');
});
