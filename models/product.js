'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: String,
  picture: { type: String, default: 'default.jpg'},
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String
})

//Indicamos el nombre que llevara como collections el documento que se crea
module.exports = mongoose.model('Product', ProductSchema)