export function mungeWeather(data) {
    return data.map(place => {
        return {
            forecast: place.weather.description,
            time: place.ob_time
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

export function mungeReviews(data) {
    return data.map(rest => {
        return {
            name: rest.name,
            image_url: rest.image_url,
            price: rest.price,
            rating: rest.rating,
            url: rest.url
        }
    })
}