const { Sequelize } = require('sequelize');
require('dotenv').config();

const DATABASE_URI = process.env.DATABASE_URI;

const db = new Sequelize(DATABASE_URI, {
    logging: false,
});

module.exports = db;    

