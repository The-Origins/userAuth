const router = require("express").Router()
const {getter} = require("../controllers/tutorialController")
const firstMiddleware = require("../middleware/firstMiddleware")
const secondMiddleware = require("../middleware/secondMiddleware")
const errorHandler = require("../middleware/errorHandler")

router.use(firstMiddleware, secondMiddleware, errorHandler)

router.route("/").get(getter)

module.exports = router