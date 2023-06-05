const Owner = require('../../models/owner.model');

const getOwner = async (domain) => {


    domain = domain.toLowerCase() + ".sol"
    
    let owner = await Owner.findOne({ 
        where: { domain: domain }
     });

    if(!owner) {
        return false;
    }

    return {
        encryptedFingerprint : owner.encryptedFingerprint,   
        samirPairFingerprintEncrypted : owner.samirPairFingerprintEncrypted,
        samirPairPinEncrypted : owner.samirPairPinEncrypted,
        pubKey : owner.pubKey,     
    }
}

module.exports = getOwner;