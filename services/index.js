'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
//Generar ids unicos
const uuidv1 = require('uuid/v1');

function createToken(user){
  const id = uuidv1();
  const payload = {
    sub: id,// revisar crear ids aleaterios
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  }
  // Con moment add indicamos en que tiempo la fecha va caducar lo habitual son 14 days
  return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = createToken;