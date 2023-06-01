const aes256 = require('aes256');

const getAES256Decrypted = (key, data) => {
    return aes256.decrypt(key, data);
}

module.exports = getAES256Decrypted;