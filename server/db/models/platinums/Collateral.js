const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, BOOLEAN } = Sequelize;


const Collateral = db.define('collaterals', {
  cusip: { 
    type: STRING, 
  },
  poolname: { 
    type: STRING, 
  },
  faceinplatinum: { 
    type: FLOAT, 
  },
  active: {
    type: STRING
  },
  month: {
    type: STRING
  }      
},{ timestamps: false });


module.exports = Collateral;
