const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, BOOLEAN, DATEONLY } = Sequelize;


const PlatColl = db.define('platcoll', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  poolname: { 
    type: STRING,
    primaryKey: true  
  },
  indicator: { 
    type: STRING,
    primaryKey: true  
  },
  faceinplatinum: { 
    type: FLOAT, 
  },
  active: {
    type: STRING
  },
  born: {
    type: DATEONLY
  },
  terminated: {
    type: DATEONLY
  }      
},{ timestamps: false });


module.exports = PlatColl;
