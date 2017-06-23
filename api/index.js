const router = require('express').Router()

router.use(require('./users'))
router.use(require('./photos'))


module.exports = router
