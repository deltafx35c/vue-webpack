const router = require('express').Router()

router.use(require('./users'))
router.use(require('./pics'))


module.exports = router
