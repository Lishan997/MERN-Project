//if we want happen very first in the application we should come for app.js, because when app is started data base connection stored
//we need express for listening port
// useUnifieldTopology and useCreateIndex help to keep connection live

const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tshirt', { 
    useNewUrlParser: true,
    useUnifieldTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
});
const port = 8000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

