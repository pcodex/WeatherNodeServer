const request = require('postman-request')

const weather = (latitude,longitude, cback) => {

    const weatherurl = 'http://api.weatherstack.com/current?access_key=9f826e3cd601609ad0ce5f13eb563a05&query='+latitude+','+longitude+'&units=m'

    request(weatherurl, (err,resp,body)=> {

        if(err)
         cback('No Internet',undefined)
         else
         {
            const data = JSON.parse(body) 
            console.log(data)
            if(data.success == false)
            {
                cback('Error in weather stack request', undefined)
            }
            else{
                   weatherdata = {
                    location : data.location.name,
                    region : data.location.region,
                    time : data.location.localtime,
                    country : data.location.country,
                    currenttemp : data.current.temperature,
                    feelslike : data.current.feelslike,
                    humidity : data.current.humidity,
                    weathertoday : data.current.weather_descriptions[0]
                   } 
                   cback(undefined,weatherdata)
            }
         }


    })

}


module.exports = weather