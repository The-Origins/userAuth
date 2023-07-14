const isAuthorized = (req, res, next) =>
{
    if(req.isAuthenticated())
    {
        next()
    }
    else
    {
        res.redirect(`/login?ref=${req.url}`)
    }
}

const isAdmin = (req, res, next) =>
{
    if(req.isAuthenticated()&&req.user.admin)
    {
        next()
    }
    else
    {
        res.redirect(`/login?ref=${req.url}`)
    }
}

module.exports.isAuthorized = isAuthorized
module.exports.isAdmin = isAdmin