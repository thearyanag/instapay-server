const aes256 = require('aes256');
const base58 = require('bs58');

const getAES256Encrypted = (key, data) => {

    return aes256.encrypt(key, data);
}

module.exports = getAES256Encrypted;
