'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express');
//parser datos para todos los request http
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();
const api = require('./routers');

const multer = require('multer');// Multer guardamos los files en una carpeta de mi app
const ext = require('file-extension');// la necesitamos esta libreria para complementar multer

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

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.render('product');
});

app.get('/save-product', (req, res) => {
  res.render('saveProduct');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext(file.originalname))
  }
});

// var upload = multer({ dest: 'uploads/' })

var upload = multer({ storage: storage }).single('picture');//el name del type file

app.post('/api/post', function (req, res) {
  // req.file is the `avatar` file
  console.log('Esto es el file -> ', req.file)
  console.log('Esto es body -> ', req.body)

  upload(req, res, function(err){
    if(err){
      return res.status(500).send({ message: 'Error uploading file' });
    }
    res.status(200).send({ file: 'File upload' });
  });
})

// app.get('/hola', (req, res) =>{
//  res.send({ message: 'Hola mundo'})
// })

module.exports = app;