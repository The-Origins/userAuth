const secondMiddleware = (req, res, next) =>
{
    let middlewareData = ["data 6", "data 7","data 8","data 9","data 10"]
    res.middle2 = middlewareData
    next()
}

module.exports = secondMiddleware