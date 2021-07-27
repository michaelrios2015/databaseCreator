const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, BOOLEAN } = Sequelize;


const Platinum = db.define('platinums', {
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
  istbaelig: {
    type: BOOLEAN
  }      
},{ timestamps: false });



module.exports = Platinum;
