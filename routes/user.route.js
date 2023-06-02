const userRouter = require('express').Router();
const getDecryptedFingerprintTemplate = require('../functions/encryption/getDecryptedFingerprintTemplate');
const getAES256Decrypted = require('../functions/encryption/getAES256Decrypted');
const getOwner = require('../functions/crud/getOwner');
const getDecryptedPair = require('../functions/encryption/getDecryptedPair');
const sendTx = require('../functions/transaction/sendTx');

userRouter.post('/create', (req, res) => {
    res.send('Create user');
});


userRouter.post('/transfer', async (req, res) => {
    const { amount, from, to , pin} = req.body;
    let { fingerprint } = req.body;

    // console.log(req.body);

    let owner = await getOwner(from);

    fingerprint = getDecryptedFingerprintTemplate(fingerprint);

    let samirPair1 = getAES256Decrypted(fingerprint, owner.samirPairFingerprintEncrypted);
    let samirPair2 = getAES256Decrypted(pin, owner.samirPairPinEncrypted);

    let pvtKey = getDecryptedPair(samirPair1, samirPair2);

    console.log("pvtKey: ", pvtKey);

    let txSig = await sendTx(to, amount, pvtKey);

    res.send('Transfer money');
});

module.exports = userRouter;