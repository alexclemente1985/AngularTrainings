const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./routes');
require('dotenv').config();

const app = express();

const mongoAccess = {
    user: process.env.DBUSER,
    pwd: process.env.DBPWD,
    host: process.env.DBHOST,
    port: process.env.PORT,
    dbname: process.env.DBNAME
}

console.log('mongoAccess -> ', mongoAccess)
console.log(`${mongoAccess.user}:${mongoAccess.pwd}}@${mongoAccess.host}:${mongoAccess.port}/${mongoAccess.dbname}`)

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(`mongodb://${mongoAccess.user}:${mongoAccess.pwd}@${mongoAccess.host}:${mongoAccess.port}/${mongoAccess.dbname}`,
    {useNewUrlParser: true})
    .then(
        () => {
            try{
               // app.use('/api',api);
                
               

                app.use(function(req,res,next){
                    res.status(404).send('Not found');
                })    
                
                app.listen(3000);
            }catch(e){
                console.log('error -> ',e);
            }
        }
    );

//app.use('/api',api());

