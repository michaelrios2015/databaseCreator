const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, BOOLEAN } = Sequelize;


const PlatIstbaelig = db.define('platistbaeligs', {
  cusip: { 
    type: STRING,
  },
  istbaelig: {
    type: BOOLEAN
  }      
},{ timestamps: false });



module.exports = PlatIstbaelig;
