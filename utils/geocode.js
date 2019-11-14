const request = require('request')

const geocode = (address,callback) =>{
//encodeURI function converts address string into valid search string which api can handle...........      
            const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ2F1aGFyIiwiYSI6ImNrMmRhMHYwMzAxN2QzbWxrdmx6c2JoN2EifQ.KN3het_XnfPs84L2L3dPlg&limit=1'
            request({url,json:true},(error,{body}={})=>{  //propety shorthand for url.......
                    if(error){
                            callback('Unable to connect to weather service!',undefined)
                    }
                    else if(body.features.length === 0){
                            callback('Unable to find location.',undefined)
                    }
                    else{
                            callback(undefined,{
                                    latitude:body.features[0].center[1],
                                    longitude:body.features[0].center[0],
                                    location:body.features[0].place_name
                            })
                    }
            })
    }

    module.exports = geocode