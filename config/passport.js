const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const connection = require("./database")
const validatePassword = require("../lib/passwordUtils").validatePassword
const User = connection.models.user

const strategy = new LocalStrategy((username, password, done) => {
    User.findOne({username:username})
    .then((user) => {
        if(!user)
        {
            return done(null, false)
        }

        const isValid = validatePassword(password, user.hash, user.salt)
        if(isValid)
        {
            return done(null, user)
        }
        else
        {
            return done(null, false)
        }

    })
    .catch((err) => done(err))
})
passport.use(strategy)

passport.serializeUser((user, done) =>
{
    done(null, user._id)
})

passport.deserializeUser((userID, done) =>
{
    User.findById(userID)
    .then((user) =>
    {
        done(null, user)
    })
    .catch((err) => done(err))
})