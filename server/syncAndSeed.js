// this desperateley need to be seperated 
const { db, models: { CPN, Pool, PoolBody } } = require('./db');
const fs = require("fs");
const fastcsv = require("fast-csv");

const { 
  streamFebandPipe,
  streamMarchandPipe,
  streamMarchUpdateandPipe,
  streamAprilandPipe,
  streamAprilUpdateandPipe
      } = require('./synchAndSeedHelpers/months.js');

const  {
  streamAndPipeCMOData,
  streamAndPipeCMODataUpdate
} = require('./synchAndSeedHelpers/cmosInStandardForm.js');

const {
  poolStreamer,
  poolBodyStreamer,
  poolPredictionStreamer,
  poolFHAVAStreamer,
  actualCPRStreamer,
  actualCPRStreamerTwo,
  actualCDRStreamer,
  actualCDRStreamerTwo  
        } = require('./synchAndSeedHelpers/pools.js');

const {
  platinumStreamer,
  platinumBodyStreamer,
  platCollStreamer,
  platinumUpdateStreamer,
  platIstabaeligabletreamer,
  platinumBodyCPRStreamer
    } = require('./synchAndSeedHelpers/platinums.js');


const {
  streamAndPipeOFinCMO
} = require('./synchAndSeedHelpers/allmostallcmos.js')   

const {
    streamAndPipeFedHoldings
} = require('./synchAndSeedHelpers/fedholdings.js')

  // this is for the table I have not tackled yet 
  let streamCPN = fs.createReadStream('data/cpn.csv');
  let csvDataCPN = [];
  let csvStreamCPN = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvDataCPN.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvDataCPN.length; i++ ){
      // console.log("------------------------------------");
      for (let j = 0; j < csvDataCPN[i].length; j++ ){
        if (csvDataCPN[i][j] === '-'){
          csvDataCPN[i][j] = 0
        } else {
          csvDataCPN[i][j] = parseFloat(csvDataCPN[i][j]); 
        }

        // console.log(csvDataCPN[i][j]);
      }
      
      await CPN.create({ zero: csvDataCPN[i][0], one: csvDataCPN[i][1], two: csvDataCPN[i][2], three: csvDataCPN[i][3], four: csvDataCPN[i][4], five: csvDataCPN[i][5], six: csvDataCPN[i][6], 
        seven: csvDataCPN[i][7], eight: csvDataCPN[i][8], nine: csvDataCPN[i][9], ten: csvDataCPN[i][10], eleven: csvDataCPN[i][11], 
        twelve: csvDataCPN[i][12], thirteen: csvDataCPN[i][13], fourteen: csvDataCPN[i][14], fifteen: csvDataCPN[i][15]})
    }
  });


// so this works fine but needes to run one stream at a time... not entirely sure if it needs to
// but I know that works and I don't know if running them all at once works.. if i had a composite primary key
// for cmoheaders it would be more secure...
  const syncAndSeed = async()=> {
    // -----------syncing DB --------------
    // await db.sync({ force: true });
    // await db.sync();

    // -----------Building cmos one csv file at a time--------------
    // only sequilize generic primary key so need to be carful

    // streamFebandPipe();
    // streamMarchandPipe();
    // streamMarchUpdateandPipe();
    // streamAprilandPipe();
    // streamAprilUpdateandPipe();

    // streamAndPipeCMOData('data/cmos/mayData.csv', 'MAY');
    // streamAndPipeCMODataUpdate('data/cmos/mayUpdateData.csv', 'MAY')
    
    // -----------Not using yet--------------
    // streamCPN.pipe(csvStreamCPN);

    // -----------Building Pools one csv file at a time--------------
    
    // So this seems to work fine with just the cusip as primary key

    // poolStreamer('data/pools/monthlySFPS_202105.csv')
    // poolStreamer('data/pools/monthlySFPS_202106.csv')
    // poolStreamer('data/pools/monthlySFPS_202107.csv')


    // poolBodyStreamer('data/pools/monthlySFPS_202105.csv', '2021-05');
    // poolBodyStreamer('data/pools/monthlySFPS_202106.csv', '2021-06');
    // poolBodyStreamer('data/pools/monthlySFPS_202107.csv', '2021-07');
    
    // poolPredictionStreamer('data/pools/ginnie_202106_monthly_predictions_roll.csv', '2021-06')
    // poolPredictionStreamer('data/pools/ginnie_202107_monthly_predictions_roll.csv', '2021-07')
    // poolPredictionStreamer('data/pools/ginnie_202108_monthly_predictions_roll.csv', '2021-08')

    // poolFHAVAStreamer('data/pools/FHAVATest_20210615.csv', '2021-06');
    // poolFHAVAStreamer('data/pools/FHAVATest_20210715.csv', '2021-07');

    // actualCPRStreamer('data/pools/actualCPR_202107.csv', '2021-07'); 
    
    // actualCPRStreamerTwo('data/pools/actualCPR_202108.csv', '2021-08'); 

    // actualCDRStreamer('data/pools/actualCDR_202107.csv', '2021-07'); 

    // actualCDRStreamerTwo('data/pools/actualCDR_202108.csv', '2021-08'); 

    // -----------Building Platinums one csv file at a time--------------

    // platinumStreamer('data/platinums/platmonPPS_202105.csv')
    // platinumStreamer('data/platinums/platmonPPS_202106.csv')
    // platinumStreamer('data/platinums/platmonPPS_202107.csv')

   
    // platinumBodyStreamer('data/platinums/platmonPPS_202105.csv', '2021-05')
    // platinumBodyStreamer('data/platinums/platmonPPS_202106.csv', '2021-06');
    // platinumBodyStreamer('data/platinums/platmonPPS_202107.csv', '2021-07');

    // platinumBodyStreamer('data/platinums/platmonPPS_202107.csv', '2021-08');
  
   
    // platinumBodyCPRStreamer('data/platinums/plat_cpr_202107.csv', '2021-06-01')

    // platinumBodyCPRStreamer('data/platinums/plat_cpr_202107_two.csv', '2021-06-01')

    // platinumBodyCPRStreamer('data/platinums/plat_cpr_prediction_202108.csv', '2021-07-01')

    // don't fully understand if this has a primary key

    // platCollStreamer('data/platinums/platcoll_202105.csv', '2021-05');
    // platCollStreamer('data/platinums/platcoll_202106.csv', '2021-06');
    // platCollStreamer('data/platinums/platcoll_202107.csv', '2021-07');

    // ------------------------------- this uses the new data to update is tba elig in platinum 

    // platinumUpdateStreamer('data/platinums/platinums_istbaelig_round_one.csv')

 
    

    // ------------------------allmost all cmos -----------------
    // don't fully understand if this has a primary key

    // ONLY LOAD ONCE OR DATA WILL BE CORRUPTED 
    // streamAndPipeOFinCMO('data/cmos/allmostAllCMOs.csv', '2021-06');

    // ------------------------ FED HOLDINGS -----------------


    // streamAndPipeFedHoldings('data/fedHoldings/FedHoldings20210714.csv');
    // streamAndPipeFedHoldings('data/fedHoldings/FedHoldings20210721.csv');
    streamAndPipeFedHoldings('data/fedHoldings/FedHoldings20210630.csv');
  };

  
module.exports = syncAndSeed;
