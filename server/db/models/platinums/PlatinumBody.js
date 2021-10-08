const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, DATEONLY, BOOLEAN } = Sequelize;


const PlatinumBody = db.define('platinumbodies', {
  cusip: { 
    type: STRING, 
    primaryKey: true  
  },
  interestrate: { 
    type: FLOAT, 
  },
  remainingbalance: { 
    type: FLOAT, 
  },
  factor: { 
    type: FLOAT, 
  },
  gwac: { 
    type: FLOAT, 
  },
  wam: { 
    type: INTEGER, 
  },
  wala: { 
    type: INTEGER, 
  },
  indicator: { 
    type: STRING, 
  },
  istbaelig: {
    type: BOOLEAN,
  },
  cpr: { 
    type: FLOAT, 
  },
  predictedcpr: { 
    type: FLOAT, 
  },
  cdr: { 
    type: FLOAT, 
  },    
  date: { 
    type: DATEONLY, 
    primaryKey: true  
  }      
},{ timestamps: false });


module.exports = PlatinumBody;
