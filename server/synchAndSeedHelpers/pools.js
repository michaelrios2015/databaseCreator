// this desperateley need to be seperated 
const { db, models: { Pool, PoolBody, PoolPrediction, PoolFHAVA } } = require('../db');
const Moment = require('moment');
const fs = require("fs");
const fastcsv = require("fast-csv");

// This is essentially going into the pool streamer
const isTBAelig = (issueDate, maturityDate, originalFace, type, indicator) => {
  
  let start = Moment(issueDate, "YYYYMMDD");
  let end = Moment(maturityDate, "YYYYMMDD");
  // console.log(start);
  // console.log(end);

  // checking the number of months from issue to maturity
  const months = end.diff(start, 'months');
  // console.log(months);
  if (originalFace >= 250000 && 
      type === 'SF' &&
      (indicator === 'X' || indicator === 'M') &&
      months  >= 336 ){
        return true
  }
  else {
    return false
  }

}
// a function to stream non changing data by month
async function poolStreamer(csv) {

  let streamMonthPools = fs.createReadStream(csv)
  let csvMonthPools = [];
  let csvStreamMonthPools = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    csvMonthPools.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvMonthPools.length; i++ ){
    // for (let i = 0; i < 3; i++ ){    
      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);
      if (csvMonthPools[i][0] === 'PS' ){
        // console.log("------------------------------------");
        const cusip  = csvMonthPools[i][1];
        const name = csvMonthPools[i][2];
        const indicator = csvMonthPools[i][3];
        const type = csvMonthPools[i][4];
        const issuedate = csvMonthPools[i][5];
        const maturitydate = csvMonthPools[i][7];
        const originalface = csvMonthPools[i][8];

        // console.log(csvMonthPools[i][5]);
        // console.log(csvMonthPools[i][7]);
        
        const istbaelig = isTBAelig(issuedate, maturitydate, originalface, type, indicator)
        let [pool, _] = (await db.query(`SELECT cusip FROM pools where cusip = '${cusip}';`));
        // console.log(pool[0]);
        // let pool = await Pool.findByPk(cusip)

        if(!pool[0]){
        // console.log('no pool')
          try {
          await Pool.create({ cusip, name, indicator, type, issuedate, maturitydate, originalface, istbaelig })
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
  await streamMonthPools.pipe(csvStreamMonthPools);
}


  
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const poolBodyStreamer = async(csv, month) => {
    let streamMonthPoolBodies = fs.createReadStream(csv)
    let csvPoolMonthBodies = [];
    let csvStreamMonthPoolBodies = fastcsv
    .parse({
      delimiter: '|'
    })
    .on("data", function(data) {
      // console.log('here')
      if (data === ''){
        data = null
        console.log(data)
      } 
      csvPoolMonthBodies.push(data);
    })
    .on("end", async function() {
      for (let i = 0; i < csvPoolMonthBodies.length; i++ ){
      // for (let i = 0; i < 10; i++ ){    

        // console.log("------------------------------------");
        // console.log(i);
        // console.log(csvPools[i][0]);

        if (csvPoolMonthBodies[i][0] === 'PS' ){
          // console.log("------------------------------------");
          // console.log(csvPoolBodies[i][1]);
          // 36202BYW9 does not have 

          if (csvPoolMonthBodies[i][17] === ''){
            csvPoolMonthBodies[i][17] = null;
          }
          if (csvPoolMonthBodies[i][18] === ''){
            csvPoolMonthBodies[i][18] = null;
          }
          if (csvPoolMonthBodies[i][19] === ''){
            csvPoolMonthBodies[i][19] = null;
          }

          try {
            await PoolBody.create({ cusip: csvPoolMonthBodies[i][1], interestRate: csvPoolMonthBodies[i][6], remainingBalance: csvPoolMonthBodies[i][9], 
            factor: csvPoolMonthBodies[i][10], GWAC: csvPoolMonthBodies[i][17], WAM: csvPoolMonthBodies[i][18], WALA: csvPoolMonthBodies[i][19], month: month})
          }
            catch(ex){
            console.log(ex)
          }
        }
      }
    });

    await streamMonthPoolBodies.pipe(csvStreamMonthPoolBodies);
}




// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const poolPredictionStreamer = async(csv, month) => {
    let streamPoolsPrediction = fs.createReadStream(csv) 
    let csvPoolPrediction = [];
    let csvStreamPoolsPredication = fastcsv
    .parse()
    .on("data", function(data) {
      // console.log('here')
      csvPoolPrediction.push(data);
    })
    .on("end", async function() {
      for (let i = 1; i < csvPoolPrediction.length; i++ ){
      // for (let i = 1; i < 10; i++ ){    

      // so need to search throug poolbodies for cusip and month get the id and use that to set the poolprediction ID all non connected ones will be lost 


          try {

            // let poolBody = await PoolBody.findOne({ where: {poolCusip: csvPoolPrediction[i][0], month: "APRIL"}})
            // if (poolBody){

                // await PoolPrediction.create({ cusip: csvPoolPrediction[i][0], totalOutstanding: csvPoolPrediction[i][1], vpr: csvPoolPrediction[i][2], vprNext: csvPoolPrediction[i][3], 
                // cdr: csvPoolPrediction[i][4], cdrNext: csvPoolPrediction[i][5], cpr: csvPoolPrediction[i][6], cprNext: csvPoolPrediction[i][7], poolbodyId: poolBody.id})

                await PoolPrediction.create({ cusip: csvPoolPrediction[i][0], totalOutstanding: csvPoolPrediction[i][1], vpr: csvPoolPrediction[i][2], vprNext: csvPoolPrediction[i][3], 
                  cdr: csvPoolPrediction[i][4], cdrNext: csvPoolPrediction[i][5], cpr: csvPoolPrediction[i][6], cprNext: csvPoolPrediction[i][7], month: month})
            // }
            }
              catch(ex){
                console.log(ex)
              }


        }

      });

      await streamPoolsPrediction.pipe(csvStreamPoolsPredication);
  }  

    
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    let streamPoolsFHAVA = fs.createReadStream('data/pools/FHAVATest_20210615.csv') 
    let csvPoolFHAVA = [];
    let csvStreamPoolsFHAVA = fastcsv
    .parse()
    .on("data", function(data) {
      // console.log('here')
      csvPoolFHAVA.push(data);
    })
    .on("end", async function() {
      for (let i = 0; i < csvPoolFHAVA.length; i++ ){
      // for (let i = 1; i < 10; i++ ){    
  
      // so need to search throug poolbodies for cusip and month get the id and use that to set the poolprediction ID all non connected ones will be lost 
  
  
          try {
  
            // let poolBody = await PoolBody.findOne({ where: {poolCusip: csvPoolPrediction[i][0], month: "APRIL"}})
            // if (poolBody){
  
                // await PoolPrediction.create({ cusip: csvPoolPrediction[i][0], totalOutstanding: csvPoolPrediction[i][1], vpr: csvPoolPrediction[i][2], vprNext: csvPoolPrediction[i][3], 
                // cdr: csvPoolPrediction[i][4], cdrNext: csvPoolPrediction[i][5], cpr: csvPoolPrediction[i][6], cprNext: csvPoolPrediction[i][7], poolbodyId: poolBody.id})
  
                await PoolFHAVA.create({ cusip: csvPoolFHAVA[i][0], fha: csvPoolFHAVA[i][1], va: csvPoolFHAVA[i][2], rural: csvPoolFHAVA[i][3], 
                  indian: csvPoolFHAVA[i][4], month: 'MAY' })
            // }
            }
              catch(ex){
                console.log(ex)
              }
  
  
        }
  
      });


// CUSIP,total_outstanding,VPR,VPR_next,CDR,CDR_next,CPR,CPR_next
  
module.exports = {
  poolStreamer,
  poolBodyStreamer,
  poolPredictionStreamer,
  streamPoolsFHAVA,
  csvStreamPoolsFHAVA
};
