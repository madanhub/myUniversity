const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
const store =  new session.MemoryStore();

require("dotenv").config();
const app = express();

const mongoUrl ='mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@webprojectgroup17-shard-00-00.ozyuz.mongodb.net:27017,webprojectgroup17-shard-00-01.ozyuz.mongodb.net:27017,webprojectgroup17-shard-00-02.ozyuz.mongodb.net:27017/'+process.env.MONGO_DB+'?ssl=true&replicaSet=atlas-lv1vli-shard-0&authSource=admin&retryWrites=true&w=majority';

const courseRoute = require('./api/routes/course')

const applicationRoute = require('./api/routes/courseApplication')

const userInfoRoute = require('./api/routes/userInformation')

const gradeRoute =require('./api/routes/grade')

const postRoute = require('./api/routes/insertUser')
const getRoute = require('./api/routes/getUserByID')
const getWithdrawUserRoute = require('./api/routes/insertWithdrawUser')
const getWithdrawUserRouteWithID = require('./api/routes/getWithdrawUserByID')
const libraryuserRoute = require('./api/routes/libraryuser')


try{
    mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    console.log("DB connected");
}
catch(err){
    console.error("DB connection eror::",err);
}
app.use(express.urlencoded({limit:'5mb', extended:true}))
app.use(express.json())
app.use('/images', express.static('images'))
app.use(cors())
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(session({
    secret:'secret',
    cookie: {maxAge:50000},
    saveUninitialized: false.valueOf,
    store
}))
// app.use((req, res, next) => {
//     console.log(store);
//     console.log(`${req.method} - ${req.url}`);

// })

app.use("/course", courseRoute)

app.use("/courseApplication", applicationRoute)

app.use("/userInformation", userInfoRoute)

app.use("/grade",gradeRoute)

app.use("/insert", postRoute)
app.use("/user", getRoute)
app.use("/user/withdraw", getWithdrawUserRoute)
app.use("/withdraw/user", getWithdrawUserRouteWithID)
app.use("/libraryuser" , libraryuserRoute)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;

