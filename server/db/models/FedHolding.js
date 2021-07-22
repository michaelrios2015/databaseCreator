const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, DATEONLY, BOOLEAN } = Sequelize;

// "As Of Date","CUSIP","Security Type","Security Description","Term","Maturity Date","Issuer","Spread (%)","Coupon (%)","Current Face Value","Par Value","Inflation Compensation","Percent Outstanding","Change From Prior Week","Change From Prior Year","is Aggregated"

// not sure if there is a primary key in here 
const FedHolding = db.define('fedholdings', {
  asofdate: {
    type: DATEONLY,
  },
  cusip: { 
    type: STRING,
    primaryKey: true   
  },
  currentfacevalue: { 
    type: FLOAT, 
  },
  isaggregated: {
    type: BOOLEAN
  }      
},{ timestamps: false });


module.exports = FedHolding;
