const errorHandler = (err, req, res, next) =>
{
    if(err)
    {
        res.send(`There was a problem processing your request: ${err}`)
    }
    next()
}

module.exports = errorHandler