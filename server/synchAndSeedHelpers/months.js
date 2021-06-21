const { models: { CMOHeader, CMOBody } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

  // All the month ones are being used to parse the data then
  // the data is spit out and I just use the the body and header should clean this up a bit
  // I don't know if these need to be run in order though that is how I have been doing it, 
  // they do need to be run one at a time
  // it would be better if thet=y are run order as the code could be made much shorter... 
  //------------------------------------FEB FEB  FEB-------------------------------------------------
  // so this gut is nice and easy becuase we have all the data
let streamFeb = fs.createReadStream('data/cmos/febData.csv');  
let csvFebData = [];
let csvFebStream = fastcsv
.parse()
.on("data", function(data) {
  csvFebData.push(data);
})
.on("end", async function() {
  for (let i = 0; i < csvFebData.length; i++ ){
    // for (let i = 0; i < 100; i++ ){
    // console.log(csvData[i])
    let year = csvFebData[i][0].slice(4, 8);
    let deal = csvFebData[i][0].slice(9, csvFebData[i][0].length);
    // console.log(year);
    // console.log(deal);
    
    try{
      console.log('----------------------------------------FEBFEBFEB----------------------------------------')
      let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: csvFebData[i][1]}})

      if (header){
        await CMOBody.create({ residual: csvFebData[i][4], actualCpr: csvFebData[i][2], cpr: csvFebData[i][3], 
          cprNext: csvFebData[i][5], vpr: csvFebData[i][6], vprNext: csvFebData[i][7], 
          cdr: csvFebData[i][8], cdrNext: csvFebData[i][9], currFace: csvFebData[i][10], cmoheaderId: header.id, month: 'FEB' })  
      }
      else {
        // await CMOHeader.create({ year: year, deal: deal, group: csvMarchData[i][1]})
        let newHeader =  await CMOHeader.create({ year: year, deal: deal, group: csvFebData[i][1]})
    
        await CMOBody.create({ residual: csvFebData[i][4], actualCpr: csvFebData[i][2], cpr: csvFebData[i][3], cprNext: csvFebData[i][5], vpr: csvFebData[i][6], vprNext: csvFebData[i][7], 
        cdr: csvFebData[i][8], cdrNext: csvFebData[i][9], currFace: csvFebData[i][10], cmoheaderId: newHeader.id, month: 'FEB' })
      }
    }
    catch(ex){
      console.log(ex)
    }
    }
});



//--------------------------------------------------------MARCH MARCH MARCH--------------------------------------------------
// this is the first addition of march we are missing residul, actualCpr, currFace
let streamMarchData = fs.createReadStream('data/cmos/marchData.csv');
let csvMarchData = [];
let csvMarchStream = fastcsv
.parse()
.on("data", function(data) {
  csvMarchData.push(data);
})
.on("end", async function() {
  for (let i = 0; i < csvMarchData.length; i++ ){
    // for (let i = 0; i < 100; i++ ){

    let year = csvMarchData[i][0].slice(4, 8);
    let deal = csvMarchData[i][0].slice(9, csvMarchData[i][0].length);
    try{
      console.log('----------------------------------------MARCH----------------------------------------')
    
      let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: csvMarchData[i][1]}})
    
      if (header){

        let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'MARCH'}})
        // console.log('----------------------------------------body----------------------------------------')
        if (body){
          body.cpr = csvMarchData[i][2];
          body.cprNext = csvMarchData[i][3];
          body.vpr = csvMarchData[i][4];
          body.vprNext = csvMarchData[i][5]; 
          body.cdr = csvMarchData[i][6];
          body.cdrNext = csvMarchData[i][7];
          body.residual = Math.round((body.actualCpr - csvMarchData[i][2]) * 10) / 10;

          await body.save()

        }
        else{
          await CMOBody.create({ residual: null, actualCpr: null, cpr: csvMarchData[i][2], cprNext: csvMarchData[i][3], vpr: csvMarchData[i][4], vprNext: csvMarchData[i][5], 
            cdr: csvMarchData[i][6], cdrNext: csvMarchData[i][7], currFace: null, cmoheaderId: header.id, month: 'MARCH' })  
        }
    }
    else {
      let newHeader = await CMOHeader.create({ year: year, deal: deal, group: csvMarchData[i][1]})

      await CMOBody.create({ residual: null, actualCpr: null, cpr: csvMarchData[i][2], cprNext: csvMarchData[i][3], vpr: csvMarchData[i][4], vprNext: csvMarchData[i][5], 
        cdr: csvMarchData[i][6], cdrNext: csvMarchData[i][7], currFace: null, cmoheaderId: newHeader.id, month: 'MARCH' })
    }

    }
    catch(ex){
      console.log(ex)
    }
  }
});

//-------------------------------------MARCH UPDATE MARCH UPDATE MARCH UPDATE----------------------------------- 
// seems to just add cpr and actualCpr or is this residual????? might just be wrong ok think that is ok
let streamMarchUpdateData = fs.createReadStream('data/cmos/marchUpdateData.csv');
let csvMarchUpdateData = [];
let csvMarchUpdateStream = fastcsv
.parse()
.on("data", function(data) {
  csvMarchUpdateData.push(data);
})
.on("end", async function() {
  for (let i = 0; i < csvMarchUpdateData.length; i++ ){
    // for (let i = 0; i < 100; i++ ){
    // console.log('----------------deal-----------------');

    // console.log(csvMarchUpdateData[i])
    let year = csvMarchUpdateData[i][0].slice(4, 8);
    let deal = csvMarchUpdateData[i][0].slice(9, csvMarchUpdateData[i][0].length);
    let group = csvMarchUpdateData[i][1];

    let actualCpr = csvMarchUpdateData[i][2] * 100;
    actualCpr = Math.round(actualCpr * 10) / 10

    group = group.replace(/\s+/g, '');

    deal = parseInt(deal, 10);
    try{
      console.log('----------------------------------------MARCH UPDATE----------------------------------------')
      
      // check to see if header exisits
      let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: group}})
    
      if (header){

        // check to see if body exisits
        let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'MARCH'}})
        // console.log('----------------------------------------body----------------------------------------')
    
        // console.log(body)

        if (body){
          // body exisit update actualCpr and residual
          body.actualCpr = actualCpr
          body.residual = Math.round((actualCpr - body.cpr) * 10) / 10 

          await body.save()
        }
        else{

          await CMOBody.create({ currFace: null, cmoheaderId: header.id, month: 'MARCH',  residual: null, actualCpr: actualCpr, cpr: cpr, cprNext: null, vpr: null, vprNext: null, cdr: null, cdrNext: null  })
          
        }

    }
    else {
      // no header or body
      let newHeader = await CMOHeader.create({ year: year, deal: deal, group: group})

      await CMOBody.create({ currFace: null, cmoheaderId: newHeader.id, month: 'MARCH',  residual: null, actualCpr: actualCpr, cpr: null, cprNext: null, vpr: null, vprNext: null, cdr: null, cdrNext: null  })
      // console.log(newHeader.id);

      }
    }
    catch(ex){
      console.log(ex)
    }
  }
});


//JUST A HELPER FUNCTION
const percentageOneDeciaml = (num) => {
  num *= 100;
  return Math.round(num * 10) / 10;

}


//---------------------------------------------------APRIL APRIL APRIL------------------------------------------- 
// So this has all the data except residual, actualCpr and currFace, those are left null so we can see how many are not updated
let streamAprilData = fs.createReadStream('data/cmos/aprilData.csv');
let csvAprilData = [];
let csvAprilStream = fastcsv
.parse()
.on("data", function(data) {
  csvAprilData.push(data);
})
.on("end", async function() {
  for (let i = 0; i < csvAprilData.length; i++ ){
    // for (let i = 0; i < 100; i++ ){
    // console.log(csvAprilData[i][0])
    let year = csvAprilData[i][0].slice(4, 8);
    let deal = csvAprilData[i][0].slice(9, csvAprilData[i][0].length) * 1;
    // console.log('----------------deal-----------------');
    // console.log(year);
    // console.log(deal);
    // console.log(csvAprilData[i][1]);
    
    try{
      console.log('----------------------------------------April----------------------------------------')
      let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: csvAprilData[i][1]}})
      // console.log('--------------header-------------------')
      // console.log(header)

      if (header){

        let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'APRIL'}})
        // console.log('----------------------------------------body----------------------------------------')
        // console.log(body)

        if (body){
          body.cpr = percentageOneDeciaml(csvAprilData[i][2]);
          body.cprNext = percentageOneDeciaml(csvAprilData[i][3]);
          body.vpr = percentageOneDeciaml(csvAprilData[i][4]);
          body.vprNext = percentageOneDeciaml(csvAprilData[i][5]); 
          body.cdr = percentageOneDeciaml(csvAprilData[i][6]);
          body.cdrNext = percentageOneDeciaml(csvAprilData[i][7]);
          body.residual = Math.round((body.actualCpr - csvAprilData[i][2]) * 10) / 10;

          // Math.round(actualCpr * 10) / 10
          await body.save()

        }
        else{
          await CMOBody.create({ residual: null, actualCpr: null, cpr: percentageOneDeciaml(csvAprilData[i][2]), cprNext: percentageOneDeciaml(csvAprilData[i][3]), vpr: percentageOneDeciaml(csvAprilData[i][4]),
            vprNext: percentageOneDeciaml(csvAprilData[i][5]), cdr: percentageOneDeciaml(csvAprilData[i][6]), cdrNext: percentageOneDeciaml(csvAprilData[i][7]), currFace: null, cmoheaderId: header.id, month: 'APRIL' })  
        }
    }
    else {
      let newHeader = await CMOHeader.create({ year: year, deal: deal, group: csvAprilData[i][1]})

      await CMOBody.create({ residual: null, actualCpr: null, cpr: percentageOneDeciaml(csvAprilData[i][2]), cprNext: percentageOneDeciaml(csvAprilData[i][3]), vpr: percentageOneDeciaml(csvAprilData[i][4]), 
        vprNext: percentageOneDeciaml(csvAprilData[i][5]), cdr: percentageOneDeciaml(csvAprilData[i][6]), cdrNext: percentageOneDeciaml(csvAprilData[i][7]), currFace: null, cmoheaderId: newHeader.id, month: 'APRIL' })
      // console.log(newHeader.id);
      }
    }
    catch(ex){
      console.log(ex)
    }
  }
});


//-----------------------------APRIL UPDATE APRIL UPDATE APRIL UPDATE------------------------------------------- 
// if a cobody already exisits seems to update residual and actual, if a cmbody does not exisits creates one but with only actual CPR
let streamAprilUpdateData = fs.createReadStream('data/cmos/aprilUpdateData.csv');
let csvAprilUpdateData = [];
let csvAprilUpdateStream = fastcsv
.parse()
.on("data", function(data) {
  // console.log('here')
  // console.log(data)
  csvAprilUpdateData.push(data);
})
.on("end", async function() {
  for (let i = 0; i < csvAprilUpdateData.length; i++ ){
    // for (let i = 0; i < 100; i++ ){

    // console.log('----------------deal UPDATE-----------------');
    // console.log(csvAprilUpdateData[i])
    let year = csvAprilUpdateData[i][0].slice(4, 8);
    let deal = csvAprilUpdateData[i][0].slice(9, csvAprilUpdateData[i][0].length) * 1;
    let group = csvAprilUpdateData[i][1];

    let actualCpr = csvAprilUpdateData[i][2] * 100;
    actualCpr = Math.round(actualCpr * 10) / 10

    group = group.replace(/\s+/g, '');
    
    deal = parseInt(deal, 10);
    // console.log(year);
    // console.log(deal);
    // console.log(group);
    // console.log(actualCpr);
    try{
      console.log('----------------------------------------APRIL UPDATE----------------------------------------')
    
      let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: group}})
    
      // console.log('--------------header update-------------------')
      // console.log(header)
      
      if (header){

        let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'APRIL'}})
      // console.log('----------------------------------------body----------------------------------------')
      // console.log(body)

        if (body){
          body.actualCpr = actualCpr
          if (actualCpr === 0 ){
            body.residual = body.cpr * -1;  
          } 
          else {
            body.residual = Math.round((actualCpr - body.cpr) * 10) / 10 
          }
          
          await body.save()
        }
        else{

          await CMOBody.create({ currFace: null, cmoheaderId: header.id, month: 'APRIL',  residual: null, actualCpr: actualCpr, cpr: null, cprNext: null, vpr: null, vprNext: null, cdr: null, cdrNext: null  })
          
        }

    }
    else {
      let newHeader = await CMOHeader.create({ year: year, deal: deal, group: group})

      await CMOBody.create({ currFace: null, cmoheaderId: newHeader.id, month: 'APRIL',  residual: null, actualCpr: actualCpr, cpr: null, cprNext: null, vpr: null, vprNext: null, cdr: null, cdrNext: null  })
      // console.log(newHeader.id);
    }

    }
    catch(ex){
      console.log(ex)
    }
  }
});

const streamFebandPipe = () => {
  streamFeb.pipe(csvFebStream); 
}

const streamMarchandPipe = () => {
  streamMarchData.pipe(csvMarchStream);
}

const streamMarchUpdateandPipe = () => {
  streamMarchUpdateData.pipe(csvMarchUpdateStream);
}

const streamAprilandPipe = () => {
  streamAprilData.pipe(csvAprilStream);
}

const streamAprilUpdateandPipe = () => {
  streamAprilUpdateData.pipe(csvAprilUpdateStream);
}

module.exports = {
  streamFebandPipe,
  streamMarchandPipe,
  streamMarchUpdateandPipe,
  streamAprilandPipe,
  streamAprilUpdateandPipe
}

