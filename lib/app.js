/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import request from 'superagent';
import { mungeLocation, mungeWeather } from './utils.js'


// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Proxy API');
});
// heartbeat route
app.get('/weather', async (req, res) => {
  try {

    // const response = await request.get(`http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`)
    // .query({ key: process.env.WEATHER_API_KEY })
    // .query({ lat: req.query.search })
    // .query({ lon: req.query.search })

    console.log(res.query)
    //   const weather = mungeWeather(response.body)

    //   res.json(weather)
  }
  catch (err) {
    console.log(err)
    res.status(500)
  }
});

app.get('/location', async (req, res) => {
  try {

    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${req.query.search}&format=json`)
    // .query({
    //   key: process.env.LOCATION_API_KEY,
    //   q: req.query.search,
    // })

    const location = mungeLocation(response.body)
    res.json(location[0])

  }
  catch (err) {
    console.log(err)
    res.status(500)
  }
});

app.get('/reviews?latitude=<some-lat>&longitude=<some-longitude>', (req, res) => {
  try {
    const API_KEY = process.env.YELP_API_KEY

  }
  catch (err) {
    console.log(err)
    res.status(500)
  }
});

// API routes,


export default app;