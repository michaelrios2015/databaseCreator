const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


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
  month: {
    type: STRING
  }      
},{ timestamps: false });


module.exports = Collateral;
