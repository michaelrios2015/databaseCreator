const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/cmos_builder', { logging: false });

// db.Sequelize = Sequelize;
module.exports = db;