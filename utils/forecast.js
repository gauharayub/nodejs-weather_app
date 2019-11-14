const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/b5ea65f843a80e267dd79adb95a21238/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,response)=>{     //property shorthand for url..........
        if(error){
            callback('Unable to  connect to internet!',undefined)
        }
        else if(response.body.error){
            callback('Coordinates are not in correct format',undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary +'It is currently ' + response.body.currently.temperature)
        }
    })
}

module.exports = forecast