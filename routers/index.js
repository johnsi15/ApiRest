'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const productCtrl = require('../controllers/product');
const userCtrl = require('../controllers/user');

//tener en cuenta ese router
api.get('/product', auth, productCtrl.getProducts);
api.get('/product/:productId', auth, productCtrl.getProduct);
api.post('/product', auth, productCtrl.saveProduct);
api.put('/product/:productId', auth, productCtrl.updateProduct);
api.delete('/product/:productId', auth, productCtrl.deleteProduct);
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
// Rutas con restrincción del acceso gracias a JWT
api.get('/private', auth, function (req, res){
	res.status(200).send({ message: 'Tienes acceso' });
});

module.exports = api;