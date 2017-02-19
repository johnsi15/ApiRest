'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express')
//parser datos para todos los request http
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

//middlewale
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/hola', (req, res) =>{
//  res.send({ message: 'Hola mundo'})
// })

app.get('/api/product', (req, res) =>{
  res.send(200, { products: []})
})

app.get('/api/product/:productId', (req, res) =>{
  
})

app.post('/api/product', (req, res) =>{
  console.log(req.body)
  res.status(200).send({ message: 'Se recibio el post o producto'})
})

app.put('/api/product/:productId', (req, res) =>{
  
})

app.delete('/api/product/:productId', (req, res) =>{
  
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) return console.log('Error al conectar con la base de datos: '+ err)
  console.log('Conexión a la base de datos establecidad....');

  app.listen(port, () => {
    console.log('Api Rest corriendo en http://localhost:3000')
    // console.log(`Api Rest corriendo en http://localhost:${port}`)
  })

})
