const db = require('../../db')
const Sequelize = require('sequelize');
const Moment = require('moment');
const { BOOLEAN } = require('sequelize');
const { INTEGER, STRING, FLOAT, VIRTUAL, DATEONLY } = Sequelize;


const ActualCPR = db.define('actualcprs', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  actualcpr: { 
    type: FLOAT, 
  },
  date: {
    type: DATEONLY,
    primaryKey: true
  }    
},{ timestamps: false });



module.exports = ActualCPR;
