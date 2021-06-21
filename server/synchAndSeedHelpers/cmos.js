// this desperateley need to be seperated 

const { models: { CMOHeader, CMOBody } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");
      //CMOHEADER 
      let streamCMOHeader = fs.createReadStream('data/cmosCompiled/CMOHeaderData.csv');
      let csvCMOHeaderData = [];
      let csvCMOHeaderStream = fastcsv
      .parse()
      .on("data", function(data) {
        // console.log('here')
        // console.log(data)
        csvCMOHeaderData.push(data);
      })
      .on("end", async function() {
        for (let i = 0; i < csvCMOHeaderData.length; i++ ){
          
          // console.log('----------------------------------------April----------------------------------------')
          // console.log(csvCMOHeaderData)
  
          
          try{
                await CMOHeader.create({ id: csvCMOHeaderData[i][0], year: csvCMOHeaderData[i][1], deal: csvCMOHeaderData[i][2], 
                  group: csvCMOHeaderData[i][3] })
          }
          catch(ex){
            console.log(ex)
          }
        }
      });

    //CMOBODY 
    let streamCMOBody = fs.createReadStream('data/cmosCompiled/CMOBodyData.csv');
    let csvCMOBodyData = [];
    let csvCMOBodyStream = fastcsv
    .parse()
    .on("data", function(data) {
      // console.log('here')
      // console.log(data)
      csvCMOBodyData.push(data);
    })
    .on("end", async function() {
      for (let i = 0; i < csvCMOBodyData.length; i++ ){
        
        // console.log('----------------------------------------April----------------------------------------')
        // console.log(csvCMOBodyData)

        
        try{
              await CMOBody.create({ id: csvCMOBodyData[i][0], month: csvCMOBodyData[i][1], actualCpr: csvCMOBodyData[i][2], 
                residual: csvCMOBodyData[i][3], cpr: csvCMOBodyData[i][4], cprNext: csvCMOBodyData[i][5], 
                vpr: csvCMOBodyData[i][6], vprNext: csvCMOBodyData[i][7], 
                cdr: csvCMOBodyData[i][8], cdrNext: csvCMOBodyData[i][9], 
                currFace: csvCMOBodyData[i][10], cmoheaderId: csvCMOBodyData[i][11]})
        }
        catch(ex){
          console.log(ex)
        }
      }
    });


    module.exports = {
      streamCMOHeader,
      csvCMOHeaderStream,
      streamCMOBody,
      csvCMOBodyStream
    }