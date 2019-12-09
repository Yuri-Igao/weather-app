const utils = require('./geocode.js')

const path = require('path')
const express = require('express')
const hbs=require('hbs')

const app = express()

//path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

//handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static path for general directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', { title:'Weather', name:'Yuri dos Anjos'})
})

app.get('/about', (req, res) => {
    res.render('about', {title:'About Me', name:'Yuri dos Anjos'})
})

app.get('/help', (req, res) => {
    res.render('help', { helpText:'This is some helpful text.', name:'Yuri dos Anjos', title:'Help'})
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        return res.send({error: 'Please insert ?location=location'})
    }

    utils.geocode(req.query.location, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        utils.forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({location, forecastData})
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error: 'You search must be provided'
        })
    }else{
        res.send({text: req.query.search})
    }
})

app.get('/help/*', (req, res)=>{
    res.render('404', {errorMessage:'Help article not found', title:'404', name:'Yuri dos Anjos'})
})

app.get('*', (req, res)=>{
    res.render('404', {errorMessage:'Page not found', title:'404', name:'Yuri dos Anjos'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})