var express = require('express')
  , router = express.Router()

router.use('/api/words', require('./word'))

module.exports = router;
