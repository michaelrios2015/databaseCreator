const router = require('express').Router();
const { models: { CMOHeader, CMOBody } } = require('../../db');


router.get('/year/:year/:month', async(req, res, next)=> {
  try {
    // console.log(req.params.year);
    res.send(await CMOHeader.findAll({
      where: { 
        year: req.params.year 
      },
      order: [['deal'], ['group']],
      include: [{
        model: CMOBody,
        where: {
          month: req.params.month
        }
      }]
      }
    ));
  }
  catch(ex){
    next(ex);
  }
});


//gets cmos by group
router.get('/dealandgroup/:deal/:group/:year/:month', async(req, res, next)=> {
  try {
    if (req.params.deal !== 'All' && req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOHeader.findAll({where: 
        {deal: req.params.deal, group: req.params.group, year: req.params.year},
        order: ['deal'],
        include: [{
          model: CMOBody,
          where: {
            month: req.params.month
          }
        }]
        }
      ));
    } else if ( req.params.deal !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOHeader.findAll({where: 
        {deal: req.params.deal, year: req.params.year },
        order: [['deal'], ['group']],
        include: [{
          model: CMOBody,
          where: {
            month: req.params.month
          }
        }]
        }
      ));
    } else if ( req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOHeader.findAll({where: 
        {group: req.params.group, year: req.params.year},
        order: [['deal'], ['group']],
        include: [{
          model: CMOBody,
          where: {
            month: req.params.month
          }
        }]
        }
      ));
    } 
    // this should never be reached so I should be able to get rid of it
    else{
      // console.log('-------------------------------')
      // console.log(req.params.group)
      res.send(await CMOHeader.findAll({where: {year: req.params.year},
        order: [['deal'], ['group']],
        include: [{
          model: CMOBody,
          where: {
            month: req.params.month
          }
        }]
        }
      ));
    }
  }
  catch(ex){
    // console.log('-------------------------------')
    next(ex);
  }
});

module.exports = router;



