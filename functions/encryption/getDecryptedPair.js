const { join } = require('shamir');
const base58 = require('bs58')

const getDecryptedPair = (samirPair1,samirPair2) => {

    let shares = {
        '1' : base58.decode(samirPair1),
        '3' : base58.decode(samirPair2),
    };
    const privateKey = join(shares);

    let pvtKey = base58.encode(privateKey);

    return pvtKey;
}

module.exports = getDecryptedPair;