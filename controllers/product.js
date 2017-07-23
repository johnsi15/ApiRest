'use strict'

const Product = require('../models/product');

const multer = require('multer');// Multer guardamos los files en una carpeta de mi app
const ext = require('file-extension');// la necesitamos esta libreria para complementar multer

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext(file.originalname))
  }
});

var upload = multer({ storage: storage }).single('picture');//el name del type file

function saveProduct(req, res){
  console.log('POST /api/product', req.body);

  let product = new Product();
  product.name = req.body.name;
  product.picture = 'default.jpg';
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  upload(req, res, function(err){
    // console.log('Esto es file'+ req.file.destination + req.file.filename);
    if(err){
      return res.status(500).send({ message: 'Error uploading file' });
    }
    // res.status(200).send({ file: 'File upload' });
    // Aquí enviamos el name del file.
    if(req.file){
      product.picture = req.file.filename;
    }

    product.save((err, productStored) => {
      if(err) res.status(500).send({ message: 'Error al salvar el producto'+ err })

      res.status(200).send({ product: productStored, file: 'File upload' })
    });
  });

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
  deleteProduct,
  upload
}