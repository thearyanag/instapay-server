const { DataTypes } = require('sequelize');
const db = require('../clients/db');

const Owner = db.define('owner', {
    domain : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    encryptedFingerprint: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    samirPairFingerprintEncrypted : {
        type: DataTypes.STRING(750),
        allowNull: false,
    },
    samirPairPinEncrypted : {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    pubKey : {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Owner;