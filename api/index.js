const router = require('express').Router()

router.use(require('./users'))
router.use(require('./photos'))
router.use(require('./resources'))

module.exports = router
