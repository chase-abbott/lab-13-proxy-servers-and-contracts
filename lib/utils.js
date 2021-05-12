export function mungeWeather(data) {
    return data.map(place => {
        return {
            forecast: place.weather.description,
            time: place.datetime
        }
    })
}