// this desperateley need to be seperated 
const { db, models: { Platinum, PlatinumBody, PlatColl } } = require('../db');
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
          await Platinum.create({ cusip: csvMonthPlatinums[i][1], name: csvMonthPlatinums[i][2], type: csvMonthPlatinums[i][4], 
              issuedate: csvMonthPlatinums[i][5], maturitydate: csvMonthPlatinums[i][7], originalface: csvMonthPlatinums[i][8]})
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

// ------------------------------------------------------------------------------------------------------------
// We have checked the platinums to see if the pools are is tba eligible so now we need to update platimuns

async function platinumUpdateStreamer(csv) {

  let streamPlatinums = fs.createReadStream(csv)
  let csvPlatinums = [];
  let csvStreamPlatinums = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvPlatinums.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvPlatinums.length; i++ ){
    // for (let i = 11; i < 12; i++ ){    
      // console.log("------------------------------------");
      // cusip,eligible,indicatorisx,indicatorism
      
      for (let j = 0; j < 4; j++){
        if (csvPlatinums[i][j] === ''){
          csvPlatinums[i][j] = null
        }
      }; 
      
      const cusip = csvPlatinums[i][0];
      const tbaelig = csvPlatinums[i][1];
      const X = csvPlatinums[i][2];
      const M = csvPlatinums[i][3];
      



      // console.log(csvPlatinums[i][0]);
      // console.log(csvPlatinums[i][1]);
      // console.log(csvPlatinums[i][2]);
      // console.log(csvPlatinums[i][3]);

      // let platinumbody = await PlatinumBody.findByPk(csvPlatinums[i][0])
      
      let [platbody, _] = (await db.query(`SELECT * FROM platinumbodies where cusip = '${csvPlatinums[i][0]}' and date = '2021/07/01';`));


      // console.log(platinumbody);

      // console.log(platbody[0]);

      let platinumbody = platbody[0]
      // platinum body has a null value, we have not seen it before so  
      if (X === 't' && M === 't'){
        // this should not happen it means we have not actually seen anything yet 
      }
      else if (platinumbody.istbaelig === null){
        console.log('NULL')
        // it is tba elig and (indictor is X or M, they cannot both be t I could add the logic but it's just not possible at the moment)
        if (tbaelig === 't' && (X === 't' || M === 't')){
          console.log('IS TBA ELIG AND X OR M')
          platinumbody.istbaelig = tbaelig;
          if (X === 't'){
            // indictor is X
            console.log('X is true')
            platinumbody.indicator = 'X';
          } else {
            // indictor is M
            console.log('M is true')
            platinumbody.indicator = 'M';
          }
        }
        else {
          console.log('IS NOT TBA ELIG OR NOT (X OR M)')
          // here we would make is tba elig false
          platinumbody.istbaelig = 'f';
          if (X === 'f' && M === 'f'){
            // both X and M are false so
            console.log('X AND M ARE BOTH FALSE')
            // make indictor C
            platinumbody.indicator = 'C';
          }
          // we are still in null so 
          else if (X === 't'){
            // indictor is X
            console.log('X is true')
            platinumbody.indicator = 'X';
          } 
          else {
            // indictor is M
            console.log('M is true')
            platinumbody.indicator = 'M';
          }
        }

        // console.log(platinumbody)

        // await platinumbody.save()
      
        await db.query(`UPDATE platinumbodies SET istbaelig = '${platinumbody.istbaelig}', indicator = '${platinumbody.indicator}' WHERE cusip = '${platinumbody.cusip}' AND date = '2021-07-01';`);
      }
      // we have visted this platinum before 
      else {
        // tbaelig is false 
        if (platinumbody.istbaelig === 't' && tbaelig === 'f') {
          console.log('was tba elig now not, Subplats are false')
          platinumbody.istbaelig = tbaelig
        }
        // in theory I can add some more code to check that x is false but if M was tru and now it's not then C is the only one that can be true
        if (platinumbody.indicator === 'M' && M === 'f') {
          console.log('Indicator was M should now be C also make istbaelig false')
          platinumbody.istbaelig = 'f'
          platinumbody.indicator = 'C';
        }
        // see above but with X
        else if (platinumbody.indicator === 'X' && X === 'f') {
          console.log('Indicator was X should now be C also make istbaelig false')
          platinumbody.istbaelig = 'f'
          platinumbody.indicator = 'C';
        }
        // I don't think we will get to this 
        else if (platinumbody.indicator !== 'C' && (X  === 'f' && M  === 'f' )) {
          console.log('Indicator was X should now be C also make istbaelig false')
          platinumbody.istbaelig = 'f'
          platinumbody.indicator = 'C';
        }

        //  await platinum.save()
        // console.log(platinumbody)

        await db.query(`UPDATE platinumbodies SET istbaelig = '${platinumbody.istbaelig}', indicator = '${platinumbody.indicator}' WHERE cusip = '${platinumbody.cusip}' AND date = '2021-07-01';`);
      }  
 
    }
  });


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // console.log(streamMonthPools);
  // await streamAprilData.pipe(csvAprilStream);
  await streamPlatinums.pipe(csvStreamPlatinums);
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// this adds the changing monthly data 

const platinumBodyStreamer = async(csv, date) => {
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
          factor: csvPlatinumMonthBodies[i][10], gwac: csvPlatinumMonthBodies[i][16], wam: csvPlatinumMonthBodies[i][17], wala: csvPlatinumMonthBodies[i][18], indicator: null, istbaelig: null,  cpr: null, date})
        }
          catch(ex){
          console.log(ex)
        }
      }
    }
  });

  await streamMonthPlatinumBodies.pipe(csvStreamMonthPlatinumBodies);
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// this adds the cpr 

const platinumBodyCPRStreamer = async(csv, date) => {
  let j = 0;
  let streamMonthPlatinumBodies = fs.createReadStream(csv)
  let csvPlatinumMonthBodies = [];
  let csvStreamMonthPlatinumBodies = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    if (data === ''){
      data = null
      console.log(data)
    } 
    csvPlatinumMonthBodies.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvPlatinumMonthBodies.length; i++ ){
    // for (let i = 1; i < 10; i++ ){    

      // console.log("------------------------------------");
      // console.log(csvPlatinumMonthBodies[i][0]);

      // let platinumbody = await PlatinumBody.findOne({where: {cusip: csvPlatinumMonthBodies[i][0], date }})
      // let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: month}})

      const cusip = csvPlatinumMonthBodies[i][0];
      let cpr ;
      if (csvPlatinumMonthBodies[i][1] === ''){
        cpr = null;
      }
      else {
        cpr = csvPlatinumMonthBodies[i][1];
      }

      // const istbaelig = isTBAelig(issuedate, maturitydate, originalface, type, indicator)
      let [platbody, _] = (await db.query(`SELECT * FROM platinumbodies where cusip = '${cusip}' and date = '${date}';`));


      // console.log(platinumbody[0]);

      // console.log(platbody[0]);

      // console.log(platbody[0]['cpr']);
      // console.log(cusip);
      // console.log(cpr);

      
      
      if (!platbody[0]){
        // can't find it in database maybe using wrong dates??
      }
      else if (platbody[0]['cpr'] === null && cpr !== null){
        console.log('NULL')
        await db.query(`UPDATE platinumbodies set cpr = '${cpr} 'where cusip = '${cusip}' and date = '${date}';`)
        // platinum.cpr = csvPlatinums[i][1]
        // await platinum.save()
      }
      else if (platbody[0]['cpr'] !== (cpr * 1) && cpr !== null) {
        console.log('CPR UPDATED')
        console.log(cpr);
        await db.query(`UPDATE platinumbodies set cpr = '${cpr} 'where cusip = '${cusip}' and date = '${date}';`)
        // await platinum.save()
        j++;
        console.log(j);
      }  
    
      
    }
    
  });

  await streamMonthPlatinumBodies.pipe(csvStreamMonthPlatinumBodies);
}


// ------------------------------------------------------------------------------------------------
// first attempt at dealing with the collaterals

async function platCollStreamer(csv, date) {

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
    // for (let i = 0; i < 20; i++ ){
      console.log(csvMonthCollateral[i])
      const cusip = csvMonthCollateral[i][0].slice(0, 9);
      const poolname = csvMonthCollateral[i][0].slice(19, 25);
      const indicator = csvMonthCollateral[i][0].slice(25, 26);
      const faceinplatinum = csvMonthCollateral[i][0].slice(53, 68);
      const active = csvMonthCollateral[i][0].slice(79, 80);

      // console.log(cusip);
      // console.log(poolname);
      // console.log(indicator);
      // console.log(faceinplatinum);
      // console.log(active);
      // console.log(date);

      let [platcoll, _] = (await db.query(`SELECT cusip, active FROM platcolls WHERE cusip = '${cusip}' AND poolname = '${poolname}' AND indicator = '${indicator}';`));

      // console.log(platcoll[0].active);
      // console.log(platcoll);

      //if the platcoll does not exist and it is already terminated, so we say it was born and terminted this month
      if (!platcoll[0] && active === 'T'){
        const born = date;
        const terminated = date;
        try {
        await PlatColl.create({ cusip, poolname, indicator, faceinplatinum, active, born, terminated })
        }
        catch(ex){
          console.log(ex)
        }
      }
      //if the platcoll does not exist and it is still active
      else if (!platcoll[0] && active === 'A'){
        const born = date;
        try {
        await PlatColl.create({ cusip, poolname, indicator, faceinplatinum, active, born, terminated: null })
        }
        catch(ex){
          console.log(ex)
        }
      }
      // if the platcoll exists, it was active and is now terminated 
      else if (active === 'T' && platcoll[0].active === 'A'){
        const terminated = date;
        try {
          platcoll[0].active = active;
          platcoll[0].terminated = terminated;
          console.log('------------------------------');
          console.log(platcoll[0]);
          await db.query(`UPDATE platcolls SET active = '${active}', terminated = '${terminated}-01' WHERE cusip = '${cusip}' AND poolname = '${poolname}' AND indicator = '${indicator}';`);

          // await platcoll.save()
          // platinum.istbaelig = csvPlatinums[i][7]
          // await platinum.save()
        }
        catch(ex){
          console.log(ex)
        }
      }
    }
  });


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  await streamMonthCollateral.pipe(csvStreamMonthCollateral);
}




module.exports = {
  platinumStreamer,
  platinumBodyStreamer,
  platCollStreamer,
  platinumUpdateStreamer,
  platinumBodyCPRStreamer
};
