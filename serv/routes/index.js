const router = require('express').Router(),
  discord = require('./discord')

router.use('/discord', discord)


module.exports = router;
