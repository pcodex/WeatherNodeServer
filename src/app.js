const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

//set the public directory to serve assets and client side JS
const pubPath = path.join(__dirname, '../public')

//tell express which directory is used to serve assets and client side JavaScript
app.use(express.static(pubPath))

//use handlebars
const viewsPath = path.join(__dirname,'../templates/views')
app.set('view engine','hbs')
app.set('views',viewsPath)

//set up a path to the Partials directory
const partialsPath = path.join(__dirname, '../templates/partials')

//tell HBS about the partials directory
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {

    res.render('index', {
        title:'Weather Website',
        name : 'get your weather forecast',        
        author:'http://samvit.com.au'
    })
    

})

app.get('/about', (req,res)=> {

    res.render('about', {
        name : 'About Page',
        content : 'This is a website for Nodejs handlebars',
        title : 'About Us',
        author : 'http://samvit.com.au'
    })

})

app.get('/help',(req,res) => {
    res.render('help', {
        pagename : 'Help',
        title : 'Help Us',
        helpcontent : 'To use handlebars set the HBS engine and then the views directory \
        Also create hbs files in the views directory. Use app.set to set the "view engine" and "views" \
        Within each hbs file you can expect dynamic content by using variable names within "{{}}}" \
        and then in app.js you can pass an object containing the variable names as keys with corresponding values \
        Pass the object as an argument to res.render within the route handler',
        author:'http://samvit.com.au'
        
    })
})


app.get('/weather', (req,res) => {

    const myaddress = req.query.address

    if(!req.query.address){
        return res.send({
            error:'You must specify an address'
        })
    }

    geocode(myaddress, (err,{place,latitude,longitude} = {}) => {

        if(err)        
         return res.send({
            error:'Geocode Error : ' + err
        })
        else{
    
            console.log('The latitute of  ' + place+ ' is ' + latitude + ' and the longitude is '+ longitude)
    
            //const lat = data.latitude
            //const lon = data.longitude
    
            weather(latitude,longitude, (err, {location,region,country,feelslike,weathertoday,time,currenttemp}) => {
    
                if(err)
                //console.log('Weather Error : '+ err)
                return res.send({
                    error : 'Weather error : '+err
                })
                else
                {
                    let forecastMsg = 'Weather recorded at ' + location + ' ' + region+ ' ' + country+ ' at '+ time + ' was '+ currenttemp
                    forecastMsg +=  '. The weather today is '+ weathertoday
                    forecastMsg += '. It feels like '+ feelslike
                    
                                        

                    res.send({
                        forecast : forecastMsg,
                        location : place,                        
                        queryAddress : req.query.address
                    })

                }
            })
            
        
        }
    
    })

})



app.get('/products', (req, res) => {

    if(!req.query.search)
        return res.send({
            error : 'You have to specify a search term'
        })

        
    res.send({
        products : ['Fiction', 'Mystery']
    })


})

app.get('/help/*',(req,res)=> {
    res.render('my404', {
        pgtitle:'HELP PAGE NOT FOUND',
        message : 'Help article not found',
        title : 'HELP 404 Page'
    })
})


app.get('*', (req,res) => {

    res.render('my404', {
        pgtitle : 'PAGE NOT FOUND',
        message : 'Go shit yourself',
        title : '404 Page'
    })
 
})

app.listen(port, () => {
    //console.log(process.env)
    console.log('Weather Server is running on port '+ port)
})