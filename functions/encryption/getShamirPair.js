const { split } = require('shamir');
const { randomBytes } = require('crypto');

function getShamirPair(privateKey) {
    const PARTS = 3;
    const QUORUM = 2;
    const parts = split(randomBytes, PARTS, QUORUM, privateKey);
    return parts;
}

module.exports = getShamirPair;