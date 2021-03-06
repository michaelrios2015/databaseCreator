const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, DATEONLY } = Sequelize;


const PoolFHAVA = db.define('poolfhavas', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  fha: { 
    type: FLOAT, 
  },
  va: { 
    type: FLOAT, 
  },
  rural: { 
    type: FLOAT, 
  },
  indian: { 
    type: FLOAT, 
  },
  date: { 
    type: DATEONLY,
    primaryKey: true 
  }       
},{ timestamps: false });


module.exports = PoolFHAVA;
