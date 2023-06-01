const Owner = require('../../schema/owner.schema');

const getOwner = async (domain) => {
    
    let owner = await Owner.findOne({ 
        where: { domain: domain }
     });

    return {
        encryptedFingerprint : owner.encryptedFingerprint,   
        samirPairFingerprintEncrypted : owner.samirPairFingerprintEncrypted,
        samirPairPinEncrypted : owner.samirPairPinEncrypted,
        pubKey : owner.pubKey,     
    }
}

module.exports = getOwner;