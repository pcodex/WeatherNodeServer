const request = require('postman-request')


const geocode = (location, cback) => {

    const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoicG1pc3NpZXIiLCJhIjoiY2t6MjBqZmt4MXBlYjJ3cWt3MTl3cmVueiJ9.RBz0zIlpWaBRqV-5Wulbfg&limit=1'
   
     request(mapurl, (err, resp, body) => {
   
           if(err)
           {
               cback('No Internet', undefined)
           }
           else{
               const dataObj = JSON.parse(body);
               //console.log(body)
               if(dataObj.features.length === 0)
               {
                   cback('Error in mapbox request', undefined)
               }
               else{
                   geodata = {
                       place : dataObj.features[0].place_name,
                       latitude : dataObj.features[0].center[1],
                       longitude : dataObj.features[0].center[0]
                   }
                   cback(undefined,geodata)
               }
           }
     })
   }
   

   module.exports = geocode