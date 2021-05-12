/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import request from 'superagent';


// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/weather', (req, res) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY

  }
  catch (err) {
    console.log(err)
    res.status(500)
  }
});

// API routes,


export default app;