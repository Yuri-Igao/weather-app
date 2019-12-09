const request = require('request')

const geocode=(adress, callback)=>{
    const geocoding='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?language=en&limit=1&access_token=pk.eyJ1IjoiaWdhb3RlZ2EiLCJhIjoiY2szbTlvZXVlMWRkaTNua292cXdxeTVpNCJ9.TSn0sGSDrDmYtB0coMXefg'

    request({url:geocoding, json:true}, (error, {body})=>{
        if(error){
            callback('uncable to connect to the services', undefined)
        }else if(body.features.length===0){
            callback('unable to find the location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const forecast=(latitude, longitude, callback)=>{
    const darksky='https://api.darksky.net/forecast/0f54961b15219346e36ead07bcb7aed2/'+latitude+','+longitude+'?units=si&lang=en'
    
    request({url: darksky, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to the services', undefined)
        }else if(body.error){
            callback('unable to find the location', undefined)
        }else{
            callback(undefined, {
                temperature: body.currently.temperature,
                rain_chance: body.currently.precipProbability,
                summary: body.currently.summary
            })
        }
    })
}


module.exports={geocode:geocode, forecast:forecast}