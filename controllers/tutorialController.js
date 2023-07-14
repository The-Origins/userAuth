const getter = (req, res) =>
{
    if(req.session.viewCount)
    {
        req.session.viewCount++
    }
    else
    {
        req.session.viewCount = 1
    }
    res.status(200).json({success:true, data:[req.session], message:`fetched tutorial session data, visits:${req.session.viewCount}`})
}

module.exports = {getter}