const getLogin = (req, res) =>
{
    const form = `<div>
    <h1>Login ${ req.query.ref ? "to access" + req.query.ref:""}</h1>
    <form method="POST" action="/login">
    <input placeholder="username" type="name" name="username"></input></br>
    <input placeholder="password" type="password" name="password"></input></br>
    <input type="submit" value="submit"/></form></div>`
    res.send(form)
}

const getRegister = (req, res) =>
{
    const register = `<div>
    <h1>Register form</h1>
    <form method="POST" action="/register">
    <input placeholder="username" type="name" name="username"></input></br>
    <input placeholder="password" type="password" name="password"></input></br>
    <input type="submit" value="submit"/></form></div>`
    res.send(register)
}

module.exports = {getLogin, getRegister}