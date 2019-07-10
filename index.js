const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/URL_shortner',{useNewUrlParser: true}, function(err){
    if(err){
        console.log("Unable to connect to mongoDB Servers");
    }else{
        console.log("Connected to MongoDB Severs");
    }
})

app.use(express.json({extended: false}));

app.use('/', require('./Routes/index'));
app.use('/api/url', require('./Routes/url'));


app.listen(port, () => console.log(`Server running on port ${port}`));