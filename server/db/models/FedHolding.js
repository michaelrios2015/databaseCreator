const db = require('..')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, DATE } = Sequelize;

// "As Of Date","CUSIP","Security Type","Security Description","Term","Maturity Date","Issuer","Spread (%)","Coupon (%)","Current Face Value","Par Value","Inflation Compensation","Percent Outstanding","Change From Prior Week","Change From Prior Year","is Aggregated"

const FedHolding = db.define('fedholdings', {
  asofdate: {
    type: DATE,
  },
  cusip: { 
    type: STRING, 
  },
  currentfacevalue: { 
    type: FLOAT, 
  },
  isaggregated: {
    type: STRING
  }      
},{ timestamps: false });


module.exports = FedHolding;
