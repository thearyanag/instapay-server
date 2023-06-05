const { Keypair } = require('@solana/web3.js')
const getShamirPair = require('./getShamirPair')

const getShamirKeypair = () => {
    let keypair = Keypair.generate()
    let publicKey = keypair.publicKey.toString()
    let pair = getShamirPair(keypair.secretKey)
    return {
        pair,
        publicKey
    }
}

module.exports = getShamirKeypair