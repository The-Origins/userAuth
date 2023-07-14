require("dotenv").config()
const express = require("express")
const passport = require("passport")
const crypto = require("crypto")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const app = express()
const routes = require("./routes")
const tutorialRouter = require("./routes/tutorial")

// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology:true})
// mongoose.connection.on("error", (err) => console.error(err))
// mongoose.connection.once("open", () => console.log("database started"))
require("./config/database")

const sessionConfig ={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.DATABASE_URL,
        mongooseConnection:mongoose.connection,
        ttl:15*60,
        collectionName:process.env.COLLECTION
    }),
    cookie:{
        httpOnly:true,
        maxAge:15*60*1000
    }
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session(sessionConfig))
require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) =>
{
    console.log(req.session)
    console.log(req.user)
    next()
})

app.use(routes)



app.get("*", (req,res) =>
{
    res.status(404).json({success:false, data:[], message:`could not resolve '${req.url}'`})
})
app.listen(process.env.SERVER_PORT, () => {console.log(`Listening at http://localhost:${process.env.SERVER_PORT}`)})
