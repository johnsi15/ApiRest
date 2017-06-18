// Usar variables de entorno para traer las claves como token secret
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
  SECRET_TOKEN: process.env.JWT || 'miclavedetoen', //Revisar crear un token con variable de entorno
}