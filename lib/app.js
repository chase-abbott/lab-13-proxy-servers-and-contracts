/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import request from 'superagent';
import { mungeLocation, mungeReviews, mungeWeather } from './utils.js'
//add cors

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

    const response = await request.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${req.query.latitude}&lon=${req.query.longitude}`)

    const weather = mungeWeather(response.body.data)

    res.json(weather)
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

app.get('/reviews', async (req, res) => {
  try {
    const response = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    // .query({ latitude: req.query.latitude })
    // .query({ longitude: req.query.longitude })

    const reviews = mungeReviews(response.body.businesses)
    res.json(reviews)
  }
  catch (err) {
    console.log(err)
    // res.status(500)
  }
});

// API routes,

export default app;
