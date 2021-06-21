const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


const CPN = db.define('cpn', {
  zero: { 
    type: FLOAT, 
  },
  one: { 
    type: FLOAT, 
  },
  two: { 
    type: FLOAT, 
  },
  three: { 
    type: FLOAT, 
  },
  four: { 
    type: FLOAT, 
  },
  five: { 
    type: FLOAT, 
  },
  six: { 
    type: FLOAT, 
  },
  seven: { 
    type: FLOAT, 
  }, 
  eight: { 
    type: FLOAT, 
  },
  nine: { 
    type: FLOAT, 
  },
  ten: { 
    type: FLOAT, 
  },
  eleven: { 
    type: FLOAT, 
  },
  twelve: { 
    type: FLOAT, 
  },
  thirteen: { 
    type: FLOAT, 
  },
  fourteen: { 
    type: FLOAT, 
  },
  fifteen: { 
    type: FLOAT, 
  }     
},{ timestamps: false });



module.exports = CPN;
