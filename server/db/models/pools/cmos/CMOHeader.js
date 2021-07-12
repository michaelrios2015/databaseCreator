const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;

const CMOHeader = db.define('cmoheader', {
  year: { 
    type: INTEGER, 
  },
  deal: { 
    type: INTEGER, 
  },
  group: { 
    type: STRING, 
  }     
},{ timestamps: false });

module.exports = CMOHeader;
