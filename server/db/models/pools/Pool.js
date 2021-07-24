const db = require('../../db')
const Sequelize = require('sequelize');
const Moment = require('moment');
const { BOOLEAN } = require('sequelize');
const { INTEGER, STRING, FLOAT, VIRTUAL } = Sequelize;


const Pool = db.define('pools', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  name: { 
    type: STRING, 
  },
  indicator: { 
    type: STRING, 
  },
  type: { 
    type: STRING, 
  },
  issuedate: { 
    type: INTEGER, 
  },
  maturitydate: { 
    type: INTEGER, 
  },
  originalface: { 
    type: FLOAT, 
  },
  istbaelig : { 
    type: BOOLEAN, 
  }      
},{ timestamps: false });



module.exports = Pool;
