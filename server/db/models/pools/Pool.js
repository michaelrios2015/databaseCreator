const db = require('../../db')
const Sequelize = require('sequelize');
const Moment = require('moment');
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
  issueDate: { 
    type: INTEGER, 
  },
  maturityDate: { 
    type: INTEGER, 
  },
  originalFace: { 
    type: FLOAT, 
  },
  isTBAElig : { 
    type: VIRTUAL,
    get () 
    {
      let start = Moment(this.getDataValue('issueDate'), "YYYYMMDD");
      let end = Moment(this.getDataValue('maturityDate'), "YYYYMMDD");
      // console.log(start);
      // console.log(end);
      
      const months = end.diff(start, 'months');
      // console.log(months);
      if (this.getDataValue('originalFace') >= 250000 && 
          this.getDataValue('type') === 'SF' &&
          (this.getDataValue('indicator') === 'X' || this.getDataValue('indicator') === 'M') &&
          months  >= 336 ){
            return true
    }
      else {
        return false
      }
    } 
  }      
},{ timestamps: false });



module.exports = Pool;
