const db = require('../../db')
const Sequelize = require('sequelize');
const { STRING, FLOAT } = Sequelize;

const CMOBody = db.define('cmobody', {
  month: { 
    type: STRING, 
  },
  actualCpr: { 
    type: FLOAT, 
  },
  residual: { 
    type: FLOAT, 
  },
  cpr: { 
    type: FLOAT, 
  },
  cprNext: { 
    type: FLOAT, 
  },
  vpr: { 
    type: FLOAT, 
  }, 
  vprNext: { 
    type: FLOAT, 
  },
  cdr: { 
    type: FLOAT, 
  },
  cdrNext: { 
    type: FLOAT, 
  },
  currFace: { 
    type: FLOAT, 
  }     
},{ timestamps: false });

module.exports = CMOBody;
