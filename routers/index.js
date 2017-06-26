'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const productCtrl = require('../controllers/product');

//tener en cuenta ese router
api.get('/product', productCtrl.getProducts);
api.get('/product/:productId', productCtrl.getProduct);
api.post('/product', productCtrl.saveProduct);
api.put('/product/:productId', productCtrl.updateProduct);
api.delete('/product/:productId', productCtrl.deleteProduct);
// Rutas con restrincción del acceso gracias a JWT
api.get('/private', auth, function (req, res){
	res.status(200).send({ message: 'Tienes acceso' });
});

module.exports = api;