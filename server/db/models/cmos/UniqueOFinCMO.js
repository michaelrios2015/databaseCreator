const db = require('../../db')
const Sequelize = require('sequelize');
const { STRING, FLOAT, DATEONLY } = Sequelize;

// add group composit key cmo, cusip, group 
const UniqueOFinCMO = db.define('uniqueofincmo', {
    cmo: { 
      type: STRING, 
      primaryKey: true 
    },
    cusip: { 
      type: STRING,
      primaryKey: true  
    },
    faceincmo: { 
        type: FLOAT,  
    },
    date: { 
        type: DATEONLY,
        primaryKey: true  
    },
    collapsed: { 
      type: DATEONLY,
      primaryKey: true  
  }    
},{ timestamps: false });

module.exports = UniqueOFinCMO;


// that should work 
// const OFinCMO = db.query(`
//     CREATE TABLE IF NOT EXISTS  "Continent"(
//         id INTEGER PRIMARY KEY,
//         name VARCHAR(100) NOT NULL
//     );
//     `)



