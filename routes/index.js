const router = require("express").Router()
const passport = require("passport")
const {getLogin, getRegister} = require("../controllers/gui")
const {login, register} = require("../controllers/auth")
const authMiddleware = require("../middleware/authMiddleware")
const errorHandler = require("../middleware/errorHandler")

router.use(errorHandler)

router.get("/", (req, res) =>
{
    if(req.session.visits)
    {
        req.session.visits +=1
    }
    else
    {
        req.session.visits = 1
    }
    res.send(`<div><h1>${req.session.visits < 4? "Welcome":"YOU ARE FUCKING ADDICTED"}</h1><p>Click here to <a href='/login'>login</a></p><p>Click here to <a href='/register'>register</a></p></div>`)   
})

router.get("/login-success", (req, res) =>
{
    res.send("<div><h1>Logged in</h1><p>You've been authenticated you can now access this <a href='/protected-route'>protected route</a></p></div>")
})

router.get("/login-faliure", (req, res) =>
{
    const form = `<div>
    <h1>Login form</h1>
    <p>Incorrect username or password</p>
    <form method="POST" action="/login">
    <input placeholder="username" type="name" name="username"></input></br>
    <input placeholder="password" type="password" name="password"></input></br>
    <input type="submit" value="submit"/></form></div>`
    res.send(form)
})

router.get("/protected-route", authMiddleware.isAuthorized,  (req, res) =>
{
    res.send(`<div><h1>SECRET</h1><p>This is user material, <a href='/logout?ref=${req.url}'>logout</a> if you're done</p></div>`)
})

router.get("/admin-route", authMiddleware.isAdmin,  (req, res) =>
{
    res.send(`<div><h1>TOP SECRET</h1><p>This is admin material, <a href='/logout?ref=${req.url}'>logout</a> if you're done</p></div>`)
})

router.get("/logout", (req, res, next) =>
{
    req.logout((err) => {
        if(err)
        {
            return next(err)
        }
        res.redirect(`${req.query.ref}`)
    })
})

router.post("/login",passport.authenticate("local", {failureRedirect:"/login-faliure", successRedirect:"login-success"}))

router.route("/login").get(getLogin)
router.route("/register").get(getRegister).post(register)


module.exports = router