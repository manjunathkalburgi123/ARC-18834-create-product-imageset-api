const express = require('express')
const path = require('path')
const ImageSetRoute = require('./api/routes/imageset')
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.use('/imageset',ImageSetRoute);
app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname + "/index.html"));
})
module.exports = app;
