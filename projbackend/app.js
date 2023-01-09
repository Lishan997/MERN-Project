//if we want happen very first in the application we should come for app.js, because when app is started data base connection stored
//we need express for listening port
// useUnifieldTopology and useCreateIndex help to keep connection live

require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,
    useUnifieldTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("DB NOTCONNECTED")
});
const port = 8000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

