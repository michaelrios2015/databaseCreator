const { models: { CMOHeader, CMOBody } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");


//JUST A HELPER FUNCTION
const percentageOneDeciaml = (num) => {
  num *= 100;
  return Math.round(num * 10) / 10;

}


//---------------------------------------------------MONTH------------------------------------------- 
// So this has all the data except residual, actualCpr and currFace, those are left null so we can see how many are not updated

// this seems to work fine 
const streamAndPipeCMOData = (csv, month) =>{

    let streamData = fs.createReadStream(csv);
    let csvData = [];
    let csvStream = fastcsv
    .parse({
        delimiter: ','
    })
    .on("data", function(data) {
    csvData.push(data);
    })
    .on("end", async function() {
    // for (let i = 0; i < csvData.length; i++ ){
    for (let i = 0; i < 1; i++ ){
        console.log(csvData[i])
        const year = csvData[i][0].slice(4, 8);
        const deal = csvData[i][0].slice(9, csvData[i][0].length) * 1;
        // console.log('----------------deal-----------------');
        console.log(year);
        console.log(deal);
        // console.log(csvData[i][1]);
        const group = csvData[i][1].slice(1,-1);
        // console.log(group);
        const cpr = (csvData[i][2].slice(1,-1));
        // console.log(cpr);
        const cprNext = (csvData[i][3].slice(1,-1));
        // console.log(cprNext);
        const vpr = (csvData[i][4].slice(1,-1));
        // console.log(vpr);
        const vprNext = (csvData[i][5].slice(1,-1)); 
        // console.log(vprNext);
        const cdr = (csvData[i][6].slice(1,-1));
        // console.log(cdr);
        const cdrNext = (csvData[i][7].slice(1));
        // console.log(cdrNext);
        
        try{
        // console.log('----------------------------------------MONTH----------------------------------------')
        let header = await CMOHeader.findOne({ where: { year, deal, group }})
        // console.log('--------------header-------------------')
        // console.log(header)

        if (header){

            let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: month}})
            // console.log('----------------------------------------body----------------------------------------')
            // console.log(body)

            if (body){
            // This probably needs to be redone
            // body.residual = Math.round((body.actualCpr - csvData[i][2]) * 10) / 10;

            // Math.round(actualCpr * 10) / 10
            await body.save()

            }
            else{
            await CMOBody.create({ residual: null, actualCpr: null, cpr, cprNext, vpr,
                vprNext, cdr, cdrNext, currFace: null, cmoheaderId: header.id, month: month })  
            }
        }
        else {
        let newHeader = await CMOHeader.create({ year, deal, group })

        await CMOBody.create({ residual: null, actualCpr: null, cpr, cprNext, vpr, 
            vprNext, cdr, cdrNext, currFace: null, cmoheaderId: newHeader.id, month: month })
        // console.log(newHeader.id);
        }
        }
        catch(ex){
        console.log(ex)
        }
    }
    });

    streamData.pipe(csvStream);
}

// Needs to be redone to be a function that takes in csv and month  the basics are working have not yet put it the database
//-----------------------------MONTH UPDATE MONTH UPDATE MONTH UPDATE------------------------------------------- 
// if a cobody already exisits seems to update residual and actual, if a cmbody does not exisits creates one but with only actual CPR

const streamAndPipeCMODataUpdate = (csv, month) =>{


    let streamUpdateData = fs.createReadStream(csv);
    let csvUpdateData = [];
    let csvUpdateStream = fastcsv
    .parse()
    .on("data", function(data) {
    // console.log('here')
    // console.log(data)
    csvUpdateData.push(data);
    })
    .on("end", async function() {
    // for (let i = 0; i < csvUpdateData.length; i++ ){
        for (let i = 0; i < 1; i++ ){

        // console.log('----------------deal UPDATE-----------------');
        console.log(csvUpdateData[i])
        let year = csvUpdateData[i][0].slice(4, 8);
        console.log(year)
        let deal = csvUpdateData[i][0].slice(9, csvUpdateData[i][0].length) * 1;
        console.log(deal)
        let group = csvUpdateData[i][1].slice(1,-1);
        console.log(group)    

        let actualCpr = csvUpdateData[i][2].slice(1,-1);
        console.log(actualCpr);        

        }
    //     try{
    //     console.log('----------------------------------------APRIL UPDATE----------------------------------------')
        
    //     let header = await CMOHeader.findOne({ where: {year, deal, group }})
        
    //     // console.log('--------------header update-------------------')
    //     // console.log(header)
        
    //     if (header){

    //         let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month }})
    //     // console.log('----------------------------------------body----------------------------------------')
    //     // console.log(body)

    //         if (body){
    //         body.actualCpr = actualCpr
    //         if (actualCpr === 0 ){
    //             body.residual = body.cpr * -1;  
    //         } 
    //         else {
    //             body.residual = Math.round((actualCpr - body.cpr) * 10) / 10 
    //         }
            
    //         await body.save()
    //         }
    //         else{

    //         await CMOBody.create({ currFace: null, cmoheaderId: header.id, month: 'MAY',  residual: null, actualCpr: actualCpr, cpr: null, cprNext: null, vpr: null, vprNext: null, cdr: null, cdrNext: null  })
            
    //         }

    //     }
    //     else {
    //     let newHeader = await CMOHeader.create({ year: year, deal: deal, group: group})

    //     await CMOBody.create({ currFace: null, cmoheaderId: newHeader.id, month: 'APRIL',  residual: null, actualCpr: actualCpr, cpr: null, cprNext: null, vpr: null, vprNext: null, cdr: null, cdrNext: null  })
    //     // console.log(newHeader.id);
    //     }

    //     }
    //     catch(ex){
    //     console.log(ex)
    //     }
    // }
    });

    streamUpdateData.pipe(csvUpdateStream);

}
module.exports = {
  streamAndPipeCMOData,
  streamAndPipeCMODataUpdate 
}

