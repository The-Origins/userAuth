const mongoose = require("mongoose")
const userSchema = require("../shemas/userSchema")
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology : true})
const connection = mongoose.connection
connection.on("error", (err) => console.error(err))
connection.once("open", () => console.log("Database started"))

const user = connection.model( "user", userSchema, "users")
module.exports = connection