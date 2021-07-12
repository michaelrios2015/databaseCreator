const db = require('../../db')
const Sequelize = require('sequelize');
const { STRING, FLOAT } = Sequelize;


// const OFinCMO = db.define('cmobody', {
//   month: { 
//     type: STRING, 
//   },
//   actualCpr: { 
//     type: FLOAT, 
//   },
//   residual: { 
//     type: FLOAT, 
//   },
//   cpr: { 
//     type: FLOAT, 
//   },
//   cprNext: { 
//     type: FLOAT, 
//   },
//   vpr: { 
//     type: FLOAT, 
//   }, 
//   vprNext: { 
//     type: FLOAT, 
//   },
//   cdr: { 
//     type: FLOAT, 
//   },
//   cdrNext: { 
//     type: FLOAT, 
//   },
//   currFace: { 
//     type: FLOAT, 
//   }     
// },{ timestamps: false });

// module.exports = CMOBody;


// this works fine but is called every time, probably needs to be told not to do it if table
// exisits don't need it no but could be useful later  
// const OFinCMO = db.query(`
//     CREATE TABLE "Continent"(
//         id INTEGER PRIMARY KEY,
//         name VARCHAR(100) NOT NULL
//     );
//     `)



module.exports = OFinCMO;