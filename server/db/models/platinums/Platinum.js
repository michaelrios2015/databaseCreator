const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


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
  issueDate: { 
    type: INTEGER, 
  },
  maturityDate: { 
    type: INTEGER, 
  },
  originalFace: { 
    type: FLOAT, 
  }      
},{ timestamps: false });



module.exports = Platinum;
