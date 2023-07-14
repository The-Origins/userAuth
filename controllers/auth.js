const passport = require("passport")
const generatePasswordHash = require("../lib/passwordUtils").generatePasswordHash
const connection = require("../config/database")
const User = connection.models.user

const login = (req, res, next) =>
{
    res.send("handling logging in")
}

const register = async (req, res) =>
{
    const {username, password} = req.body
    try 
    {
        if(username&&password)
        {
            const generated = generatePasswordHash(password)
            await User.create({username:username, hash:generated.hash, salt:generated.salt})
        }    
    } 
    catch (error)
    {
        next(error)
    }
    res.redirect("/login")
}

module.exports = {login, register}