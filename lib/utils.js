export function mungeWeather(data) {
    return data.map(place => {
        return {
            forecast: place.weather.description,
            time: place.datetime
        }
    })
}

export function mungeLocation(data) {
    return data.map(place => {
        return {
            formatted_query: place.display_name,
            latitude: place.lat,
            longitude: place.lon
        }
    })
}