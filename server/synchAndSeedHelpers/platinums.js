// this desperateley need to be seperated 
const { models: { Platinum, PlatinumBody, Collateral } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");


// a function to stream non changing data by month, I assume it changes each month but not sure
async function platinumStreamer(csv) {

  let streamMonthPlatinums = fs.createReadStream(csv)
  let csvMonthPlatinums = [];
  let csvStreamMonthPlatinums = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    csvMonthPlatinums.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvMonthPlatinums.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    
      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);
      if (csvMonthPlatinums[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPools[i]);
        let platinum = await Platinum.findByPk(csvMonthPlatinums[i][1])

        if(!platinum){
          try {
          await Platinum.create({ cusip: csvMonthPlatinums[i][1], name: csvMonthPlatinums[i][2], indicator: csvMonthPlatinums[i][3], type: csvMonthPlatinums[i][4], 
              issueDate: csvMonthPlatinums[i][5], maturityDate: csvMonthPlatinums[i][7], originalFace: csvMonthPlatinums[i][8]})
          }
          catch(ex){
            console.log(ex)
          }
        }  
      }
    }
  });


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // console.log(streamMonthPools);
  // await streamAprilData.pipe(csvAprilStream);
  await streamMonthPlatinums.pipe(csvStreamMonthPlatinums);
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// this adds the changing monthly data 

const platinumBodyStreamer = async(csv, month) => {
  let streamMonthPlatinumBodies = fs.createReadStream(csv)
  let csvPlatinumMonthBodies = [];
  let csvStreamMonthPlatinumBodies = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    if (data === ''){
      data = null
      console.log(data)
    } 
    csvPlatinumMonthBodies.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvPlatinumMonthBodies.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    

      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);

      if (csvPlatinumMonthBodies[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPoolBodies[i][1]);
        // 36202BYW9 does not have 

        if (csvPlatinumMonthBodies[i][16] === ''){
          csvPPlatinumMonthBodies[i][16] = null;
        }
        if (csvPlatinumMonthBodies[i][17] === ''){
          csvPlatinumMonthBodies[i][17] = null;
        }
        if (csvPlatinumMonthBodies[i][18] === ''){
          csvPlatinumMonthBodies[i][18] = null;
        }

        try {
          await PlatinumBody.create({ cusip: csvPlatinumMonthBodies[i][1], interestrate: csvPlatinumMonthBodies[i][6], remainingbalance: csvPlatinumMonthBodies[i][9], 
          factor: csvPlatinumMonthBodies[i][10], gwac: csvPlatinumMonthBodies[i][16], wam: csvPlatinumMonthBodies[i][17], wala: csvPlatinumMonthBodies[i][18], month: month})
        }
          catch(ex){
          console.log(ex)
        }
      }
    }
  });

  await streamMonthPlatinumBodies.pipe(csvStreamMonthPlatinumBodies);
}

// ------------------------------------------------------------------------------------------------
// first attempt at dealing with the collaterals

async function collateralStreamer(csv, month) {

  let streamMonthCollateral = fs.createReadStream(csv)
  let csvMonthCollateral = [];
  let csvStreamMonthCollateral = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvMonthCollateral.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvMonthCollateral.length; i++ ){
    // for (let i = 0; i < 1000; i++ ){

      const cusip = csvMonthCollateral[i][0].slice(0, 9);
      const poolname = csvMonthCollateral[i][0].slice(19, 25);
      const faceinplatinum = csvMonthCollateral[i][0].slice(53, 68);

      // console.log(cusip);
      // console.log(poolname);
      // console.log(faceinplatinum);

      try {
      await Collateral.create({ cusip, poolname, faceinplatinum, month })
      }
      catch(ex){
        console.log(ex)
      }
    
    }
  });


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  await streamMonthCollateral.pipe(csvStreamMonthCollateral);
}




module.exports = {
  platinumStreamer,
  platinumBodyStreamer,
  collateralStreamer
};
