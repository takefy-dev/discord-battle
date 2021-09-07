const CryptoJS = require('crypto-js'),
  {secretCrypto} = require('../config')

function encrypt(token){
  return CryptoJS.AES.encrypt(token, secretCrypto)
}
function decrypt (token) {
  return CryptoJS.AES.decrypt(token, secretCrypto)
}

module.exports = { encrypt, decrypt }
