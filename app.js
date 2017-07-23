'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express');
//parser datos para todos los request http
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();
const api = require('./routers');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//revisar porque se usa de esta forma use --> api
app.use('/api', api);

app.use(express.static('public'));// Files css, js etc
app.use(express.static('uploads'));// Files jpg, png etc

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.render('product');
});

app.get('/save-product', (req, res) => {
  res.render('saveProduct');
});

// app.post('/save-product', upload, function (req, res) {

//   console.log('POST /api/product', req.body);
//   // req.file is the `avatar` file
//   // console.log('Esto es el file -> ', req.file)
//   // console.log('Esto es body -> ', req.body)

//   upload(req, res, function(err){
//     // console.log('Esto es file'+ req.file.destination + req.file.filename);
//     if(err){
//       return res.status(500).send({ message: 'Error uploading file' });
//     }
//     res.status(200).send({ file: 'File upload' });
//   });
// })

// app.get('/hola', (req, res) =>{
//  res.send({ message: 'Hola mundo'})
// })

module.exports = app;