'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express')
//parser datos para todos los request http
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

//middlewale
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/hola', (req, res) =>{
//  res.send({ message: 'Hola mundo'})
// })

app.get('/api/product', (req, res) =>{
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: 'Error al realizar la peticion'+err})
    if(!products) return res.status(404).send({ message: 'No existen products: '})
    //mandamos solo la variable products porque es una nueva funcionalidad de EM6 para no colocar la clave: valor ya que se llaman igual
    res.status(200).send( { products } );
  })
})

app.get('/api/product/:productId', (req, res) =>{
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: 'Error al realizar la peticion'+err})
    if(!product) return res.status(404).send({ message: 'El producto no se encontro: '+prodcut})

    res.status(200).send({ product: 'El producto es -> '+product })
  })
})

app.post('/api/product', (req, res) =>{
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
  	if(err) res.status(500).send({ message: 'Error al salvar el producto'+ err })

  	res.status(200).send({ product: productStored })
  })
})

app.put('/api/product/:productId', (req, res) =>{
  let productId = req.params.productId
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) return res.status(500).send({ message: 'Error al actualizar el product'+err})
    
    res.status(200).send({ product: productUpdated })
  })
})

app.delete('/api/product/:productId', (req, res) =>{
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: 'Error al eliminar el product'+err})
    
    product.remove(err =>{
      if(err) return res.status(500).send({ message: 'Error al eliminar el product'+err})
      res.status(200).send({ message: 'El producto se elimino ' })
    })

  })
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) return console.log('Error al conectar con la base de datos: '+ err)
  console.log('Conexión a la base de datos establecidad....');

  app.listen(port, () => {
    console.log('Api Rest corriendo en http://localhost:3000')
    // console.log(`Api Rest corriendo en http://localhost:${port}`)
  })

})
