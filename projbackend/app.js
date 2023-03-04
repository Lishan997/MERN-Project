//if we want happen very first in the application we should come for app.js, because when app is started data base connection stored
//we need express for listening port
// useUnifieldTopology and useCreateIndex help to keep connection live

require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

//common middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//database connection
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,
    useUnifieldTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("DB NOTCONNECTED")
});

//use common middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//port define
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

