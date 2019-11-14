const express = require('express')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
//path module helps in manipulating strings of directories.....
const path = require('path')
const hbs = require('hbs')

const app = express()
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set a setting for express server..
app.set('view engine','hbs')

//express expects templates in views directory so we have to change default value.......
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//used to customize the server for serving files from static directory............
app.use(express.static(path.join(__dirname,'../public')))

//express finds matching route when we visit localhost:3000(port 3000)

//setting up route for hbs file....
app.get('',(req,res)=>{
     res.render('index',{
            title:'Weather',
            name: 'Gauhar Ayub Khan'       //access/set data of hbs file.......
     })
})

app.get('/about',(req,res)=>{
        res.render('about',{
            title:'About Us',
            name: 'Gauhar Ayub Khan'
        })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Hey Welcome to our help page',
        title:'Help Page',
        name:'Gauhar Ayub Khan'
    })
})
//route for /weather page
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send(
            {Error: 'You must provide an address'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({
                error
            })
        }
        else{
            forecast(latitude,longitude,(error,forecastData)=>{
                res.send({forecastData,
                    location})
            })
        }
                
    })
    
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
                error:'You must provide a search term'
            })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help article not found',
        name:'Gauhar Ayub Khan',
        message:'The page you requested does not exist.'
    })
})
//anything which we haven't defined will come under * (wildcard character)....
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Page Not Found',
        name:'Gauhar Ayub Khan',
        message:'Page requested does not exist.'
    })
})


//app.com
app.listen(3000, ()=>{
    
})