require('dotenv').config()
const SECRET = process.env.F_SECRET
const aes256 = require('aes256')

const getDecryptedFingerprintTemplate = (fingerprintReading) => {
    return aes256.decrypt(SECRET, fingerprintReading)
    }

module.exports = getDecryptedFingerprintTemplate