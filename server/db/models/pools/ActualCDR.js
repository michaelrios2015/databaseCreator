const db = require('../../db')
const Sequelize = require('sequelize');
const { STRING, FLOAT, DATEONLY } = Sequelize;


const ActualCDR = db.define('actualcdrs', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  cdr: { 
    type: FLOAT, 
  },
  date: {
    type: DATEONLY,
    primaryKey: true
  }    
},{ timestamps: false });



module.exports = ActualCDR;
