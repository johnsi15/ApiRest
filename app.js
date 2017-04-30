'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express')
//parser datos para todos los request http
const bodyParser = require('body-parser')
const app = express()
const api = require('./routers')


//middlewale
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//revisar porque se usa de esta forma use --> api
app.use('/api', api)

// app.get('/hola', (req, res) =>{
//  res.send({ message: 'Hola mundo'})
// })


module.exports = app