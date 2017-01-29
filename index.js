'use strict'

//tener en cuenta que estan usando una version mas alta de node para utilizar algunas cosas
const express = require('express')
//parser datos para todos los request http
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

//middlewale
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log('Api Rest corriendo en http://localhost:3000')
  // console.log(`Api Rest corriendo en http://localhost:${port}`)
})