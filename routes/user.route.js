const userRouter = require('express').Router();
const getDecryptedFingerprintTemplate = require('../functions/encryption/getDecryptedFingerprintTemplate');

const getAES256Decrypted = require('../functions/encryption/getAES256Decrypted');
const getAES256Encrypted = require('../functions/encryption/getAES256Encrypted');

const getOwner = require('../functions/crud/getOwner');
const createOwner = require('../functions/crud/createOwner');

const getDecryptedPair = require('../functions/encryption/getDecryptedPair');
const sendTx = require('../functions/transaction/sendTx');

const getShamirKeypair = require('../functions/encryption/getShamirKeypair');
const base58 = require('bs58');

userRouter.post('/transfer', async (req, res) => {
    const { amount, from, to , pin} = req.body;
    let { fingerprint } = req.body;

    if(!amount || !from || !to || !pin || !fingerprint) {
        res.send({
            status : false,
            message : "Invalid request"
        });
        return;
    }

    let owner = await getOwner(from);


    if(!owner) {
        let { pair , publicKey } = getShamirKeypair();

        let samirPair = pair;

        let fingerprintPhrase = samirPair['1'];
        fingerprintPhrase = base58.encode(fingerprintPhrase)

        let pinPhrase = samirPair['3'];
        pinPhrase = base58.encode(pinPhrase)

        let decryptedFingerprint = getDecryptedFingerprintTemplate(fingerprint);

        let samirPairFingerprintEncrypted = getAES256Encrypted(decryptedFingerprint, fingerprintPhrase);
        let samirPairPinEncrypted = getAES256Encrypted(pin, pinPhrase);

        let ownerData = {
            domain : from + ".sol",
            samirPairFingerprintEncrypted,
            samirPairPinEncrypted,
            pubKey : publicKey,
            encryptedFingerprint : fingerprint
        }

        await createOwner(ownerData);

        res.send({
            status : true,
            message : "New User created successfully",
            pubKey : publicKey
        });
        return;
    }

    fingerprint = getDecryptedFingerprintTemplate(fingerprint);

    let samirPair1 = getAES256Decrypted(fingerprint, owner.samirPairFingerprintEncrypted);
    let samirPair2 = getAES256Decrypted(pin, owner.samirPairPinEncrypted);

    let pvtKey = getDecryptedPair(samirPair1, samirPair2);

    console.log("pvtKey: ", pvtKey);

    let txSig = await sendTx(to, amount, pvtKey);

    res.send({
        status : true,
        message : "Transaction successful",
        txSig
    });
});

module.exports = userRouter;