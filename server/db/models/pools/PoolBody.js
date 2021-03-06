const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, DATEONLY } = Sequelize;


const PoolBody = db.define('poolbodies', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  interestRate: { 
    type: FLOAT, 
  },
  remainingBalance: { 
    type: FLOAT, 
  },
  factor: { 
    type: FLOAT, 
  },
  GWAC: { 
    type: FLOAT, 
  },
  WAM: { 
    type: INTEGER, 
  },
  WALA: { 
    type: INTEGER, 
  },
  date: { 
    type: DATEONLY,
    primaryKey: true 
  }      
},{ timestamps: false });


module.exports = PoolBody;
