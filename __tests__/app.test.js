import app from '../lib/app.js';
import supertest from 'supertest';
import { weather } from '../data/weather.js'
import { locations } from '../data/location.js'
import { reviews } from '../data/reviews.js'
import { mungeWeather, mungeLocation, mungeReviews } from '../lib/utils.js'


const request = supertest(app);

describe('API Routes', () => {


  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('It formats the weather', () => {
    // act - make the request
    const expected = [
      {
        "forecast": "Scattered Clouds",
        "time": "2021-05-12 20:10",
      }]

    // did it return the data we expected?
    expect(mungeWeather(weather)).toEqual(expected);

  });

  it('It formats the location', () => {
    const expected = [
      {
        "formatted_query": "Seattle, King County, Washington, USA",
        "latitude": "47.6038321",
        "longitude": "-122.3300624"
      },
      {
        "formatted_query": "Seattle, Shota Rustaveli Street, Rakatboshi mahalla, Yakkasaray district, Tashkent, 100000, Uzbekistan",
        "latitude": "41.2888524",
        "longitude": "69.2563883"
      }
    ]

    expect(mungeLocation(locations)).toEqual(expected)
  })

  it('It formats the reviews', () => {
    const expected = [{
      "name": "North India Restaurant",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/8713LkYA3USvWj9z4Yokjw/o.jpg",
      "price": "$$",
      "rating": 4.0,
      "url": "https://www.yelp.com/biz/north-india-restaurant-san-francisco?adjust_creative=RI3U3_x5kvdAgzJ15R17Cw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=RI3U3_x5kvdAgzJ15R17Cw"

    }]

    expect(mungeReviews(reviews)).toEqual(expected)
  })
});