const firstMiddleware = (req, res, next) =>
{
    let middlewareData = ["data 1", "data 2","data 3","data 4","data 5"]
    res.middle1 = middlewareData
    next()
}

module.exports = firstMiddleware