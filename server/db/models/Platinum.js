const db = require('../db')
const Sequelize = require('sequelize');
const Moment = require('moment');
const { INTEGER, STRING, FLOAT, VIRTUAL } = Sequelize;


const Platinum = db.define('platinums', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  name: { 
    type: STRING, 
  },
  type: { 
    type: STRING, 
  },
  indicator: { 
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
