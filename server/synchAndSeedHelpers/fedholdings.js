const { models: { FedHolding } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

const streamAndPipeFedHoldings = (cvs) => {
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
    // console.log(csvData[i][0]);
    // console.log(csvData[i][1].slice(1,-1));
    // console.log(csvData[i][9]);
    // console.log(csvData[i][15])
       
    const asofdate = csvData[i][0];
    const cusip = csvData[i][1].slice(1,-1);
    const currentfacevalue = csvData[i][9];
    let isaggregated
    if (csvData[i][15] === 'Y'){
        isaggregated = true;
    } else {
        isaggregated = false;
    }

    // console.log(asofdate);
    // console.log(cusip);
    // console.log(currentfacevalue);
    // console.log(isaggregated)

    try{
        await FedHolding.create({ asofdate, cusip, currentfacevalue, isaggregated })
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
    streamAndPipeFedHoldings
}

