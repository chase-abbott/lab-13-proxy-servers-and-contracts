import app from '../lib/app.js';
import supertest from 'supertest';
import { weather } from '../data/weather.js'
import { mungeWeather } from '../lib/utils.js'


const request = supertest(app);

describe('API Routes', () => {


  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('It formats the weather', async () => {
    // act - make the request
    const expected = [
      {
        "forecast": "Scattered Clouds",
        "time": "2021-05-12:20",
      }]

    // did it return the data we expected?
    expect(mungeWeather(weather)).toEqual(expected);

  });
});