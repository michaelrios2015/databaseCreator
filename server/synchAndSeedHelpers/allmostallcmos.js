const { models: { OFinCMO, UniqueOFinCMO } } = require('../db');
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
    for (let i = 1; i < csvData.length; i++ ){
      // for (let i = 0; i < 2; i++ ){
        // console.log(csvData[i])
        
        const cusip = csvData[i][0];
        // console.log(csvData[i][3].slice(1,csvData[i][3].length))
        // console.log(csvData[i][4].slice(5,csvData[i][4].length))
        const cmo = `${csvData[i][4].slice(5,csvData[i][4].length)}-${csvData[i][3].slice(1,csvData[i][3].length)}`
        // const group = csvData[i][3];
        const faceincmo = csvData[i][2];
        // console.log(cusip);
        // console.log(cmo);
        // console.log(group);
        // console.log(faceincmo);

      try{
      
          await OFinCMO.create({ cmo, cusip, faceincmo, date })
        }
      
      catch(ex){
        console.log(ex)
      }
    }
  }
  );

  stream.pipe(csvStream); 
}

const streamAndPipeUniqueOFinCMO = (cvs, date) => {

  let stream = fs.createReadStream(cvs);  
  let csvData = [];
  let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvData.length; i++ ){
      // for (let i = 0; i < 2; i++ ){
        // console.log(csvData[i])
        
        const cusip = csvData[i][0];
        // console.log(csvData[i][3].slice(1,csvData[i][3].length))
        // console.log(csvData[i][4].slice(5,csvData[i][4].length))
        const cmo = `${csvData[i][4].slice(5,csvData[i][4].length)}-${csvData[i][3].slice(1,csvData[i][3].length)}`
        // const group = csvData[i][3];
        const faceincmo = csvData[i][2];
        // console.log(cusip);
        // console.log(cmo);
        // console.log(group);
        // console.log(faceincmo);

      try{
      
          await UniqueOFinCMO.create({ cmo, cusip, faceincmo, date })
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
  streamAndPipeOFinCMO,
  streamAndPipeUniqueOFinCMO
}




