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
  streamPoolsFHAVA,
  csvStreamPoolsFHAVA
        } = require('./synchAndSeedHelpers/pools.js');

const {
  platinumStreamer,
  platinumBodyStreamer,
  collateralStreamer
    } = require('./synchAndSeedHelpers/platinums.js');


const {
    streamAndPipe
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
    
    // poolStreamer('data/pools/monthlySFPS_202104.csv')
    // poolStreamer('data/pools/monthlySFPS_202105.csv')

    // poolBodyStreamer('data/pools/monthlySFPS_202104.csv', 'APRIL')
    // poolBodyStreamer('data/pools/monthlySFPS_202105.csv', 'MAY');
    // poolBodyStreamer('data/pools/monthlySFPS_202106.csv', 'JUNE');
    
    // poolPredictionStreamer('data/pools/ginnie_202106_monthly_predictions_roll.csv', 'MAY')
    // poolPredictionStreamer('data/pools/ginnie_202107_monthly_predictions_roll.csv', 'JUNE')
    
    // streamPoolsFHAVA.pipe(csvStreamPoolsFHAVA)


    // -----------Building Platinums one csv file at a time--------------

    // platinumStreamer('data/platinums/platmonPPS_202105.csv')
    // platinumBodyStreamer('data/platinums/platmonPPS_202105.csv', 'MAY')
    // collateralStreamer('data/platinums/platcoll_202105.csv', 'MAY');

    // ------------------------allmost all cmos -----------------
    // streamAndPipe();

    // ------------------------ FED HOLDINGS -----------------
    // streamAndPipeFedHoldings();

  };

  
module.exports = syncAndSeed;
