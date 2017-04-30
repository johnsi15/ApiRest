'use strict'

const Product = require('../models/product')

function getProduct(req, res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: 'Error al realizar la peticion'+err})
    if(!product) return res.status(404).send({ message: 'El producto no se encontro: '+prodcut})

    res.status(200).send({ product: 'El producto es -> '+product })
  })
}

function getProducts(req, res){
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: 'Error al realizar la peticion'+err})
    if(!products) return res.status(404).send({ message: 'No existen products: '})
    //mandamos solo la variable products porque es una nueva funcionalidad de EM6 para no colocar la clave: valor ya que se llaman igual
    res.status(200).send( { products } );
  })
}

function saveProduct(req, res){
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
}

function updateProduct(req, res){
  let productId = req.params.productId
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) return res.status(500).send({ message: 'Error al actualizar el product'+err})
    
    res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct(req, res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: 'Error al eliminar el product'+err})
    
    product.remove(err =>{
      if(err) return res.status(500).send({ message: 'Error al eliminar el product'+err})
      res.status(200).send({ message: 'El producto se elimino ' })
    })

  })
}

module.exports = {
  getProduct,
  saveProduct,
  getProducts,
  updateProduct,
  deleteProduct
}