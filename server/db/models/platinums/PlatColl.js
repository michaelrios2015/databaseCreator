const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, BOOLEAN, DATEONLY } = Sequelize;


const PlatColl = db.define('plattcoll', {
  cusip: { 
    type: STRING, 
  },
  poolname: { 
    type: STRING, 
  },
  indicator: { 
    type: STRING, 
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
