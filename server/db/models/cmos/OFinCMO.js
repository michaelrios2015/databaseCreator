const db = require('../../db')
const Sequelize = require('sequelize');
const { STRING, FLOAT } = Sequelize;


const OFinCMO = db.define('ofincmo', {
    cusip: { 
        type: STRING, 
      },
      faceincmo: { 
        type: FLOAT, 
      },
      month: { 
        type: STRING, 
      }    
},{ timestamps: false });

module.exports = OFinCMO;


// that should work 
// const OFinCMO = db.query(`
//     CREATE TABLE IF NOT EXISTS  "Continent"(
//         id INTEGER PRIMARY KEY,
//         name VARCHAR(100) NOT NULL
//     );
//     `)



module.exports = OFinCMO;