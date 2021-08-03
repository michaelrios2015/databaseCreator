const { models: { OFinCMO } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

  // All the month ones are being used to parse the data then
  // the data is spit out and I just use the the body and header should clean this up a bit
  // I don't know if these need to be run in order though that is how I have been doing it, 
  // they do need to be run one at a time
  // it would be better if thet=y are run order as the code could be made much shorter... 
  //------------------------------------FEB FEB  FEB-------------------------------------------------
  // so this gut is nice and easy becuase we have all the data

const streamAndPipeOFinCMO = (cvs, date) => {

  let stream = fs.createReadStream(cvs);  
  let csvData = [];
  let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvData.length; i++ ){
      // for (let i = 0; i < 5; i++ ){
      // console.log(csvData[i])
      // console.log(csvData[i][3].slice(1,csvData[i][3].length))
      // console.log(csvData[i][4].slice(5,csvData[i][4].length))
      const cmo = `${csvData[i][4].slice(5,csvData[i][4].length)}-${csvData[i][3].slice(1,csvData[i][3].length)}`
      // console.log(cmo);
      
      try{
      
          await OFinCMO.create({ cmo, cusip: csvData[i][0], faceincmo: csvData[i][2], date })
        }
      
      catch(ex){
        console.log(ex)
      }
    }
  }
  );

  stream.pipe(csvStream); 
}



module.exports = {
  streamAndPipeOFinCMO
}

