const express = require('express');
const { static } = express;
const path = require('path');

const app = express();
module.exports = app

app.use(express.json());

app.use('/dist', static(path.join(__dirname, '..', '..', 'dist')));

// is this supposed to be here??
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '..', '..', 'index.html')));


//the router :)
app.use("/api", require("./routes"));


//final error catcher 
app.use((err, req, res, next)=>{
  res.status(500).send({ error:err });
});



