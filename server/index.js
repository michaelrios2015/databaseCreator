// const { db, models: { CMOS, CPN, CurrentCMOS } } = require('./db');
const app = require('./api')
const syncAndSeed = require('./syncAndSeed');

const init = async()=> {
    try {
      if (process.env.SEED){
        await syncAndSeed();
        // await inputMarchData();
      }
      //no clue what this is doing but was in the Grace Shopper boiler plate should ask
      // else {
      //   await db.sync()
      // }
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };


init();