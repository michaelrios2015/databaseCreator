const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


const PoolPrediction = db.define('poolpredictions', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  totalOutstanding: { 
    type: FLOAT, 
  },
  vpr: { 
    type: FLOAT, 
  },
  vprNext: { 
    type: FLOAT, 
  },
  cdr: { 
    type: FLOAT, 
  },
  cdrNext: { 
    type: FLOAT, 
  },
  cpr: { 
    type: FLOAT, 
  },
  cprNext: { 
    type: FLOAT, 
  },
  month: { 
    type: STRING, 
  }       
},{ timestamps: false });


module.exports = PoolPrediction;

