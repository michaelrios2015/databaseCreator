const router = require('express').Router();
const { db, models: { Pool, PoolBody, PoolPrediction } } = require('../../db');
// const Sequelize = require('sequelize');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

router.get('/', async(req, res, next)=> {
  try {
    // console.log(await Pool.findAll())
  //   let results = await Pool.findAndCountAll({ 
  //     include: [{
  //     model: PoolBody, 
  //     // required: true,
  //       include: {
  //         required: true,
  //         model: PoolPrediction,

  //       }
  //     },
  //   ],
  //   limit: 10
  // })

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT * ` +
    'FROM pools ' +
    'INNER JOIN poolbodies ' +
    'ON (pools.cusip = poolbodies.cusip) ' +
    'INNER JOIN poolpredictions ' +
    'ON (poolbodies.cusip = poolpredictions.cusip) ' +
    'INNER JOIN poolfhavas ' +
    'ON (poolbodies.cusip = poolfhavas.cusip) ' +
    'WHERE ' + 
    'poolbodies.month = \'MAY\' ' +
    'AND ' +	
    'poolpredictions.month = \'MAY\' ' +
    'AND ' +	
    'poolfhavas.month = \'MAY\' ' +
    'LIMIT 10;'));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});



router.get('/test', async(req, res, next)=> {
  try {
    
  console.log('-----------------------tests------------------------------');
  let test2 = await Pool.findAll();
  // console.log(test2)
  let [hope, nnn] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    'SELECT * ' +
    'FROM pools ' +
    'INNER JOIN poolbodies ' +
    'ON (pools.cusip = poolbodies."poolCusip") ' +
    'INNER JOIN poolpredictions ' +
    'ON (poolbodies."poolCusip" = poolpredictions.cusip) ' +
    'LIMIT 10;'));
  console.log(hope.length)

  res.send(hope)
  }
  catch(ex){
    next(ex);
  }
});



module.exports = router;



