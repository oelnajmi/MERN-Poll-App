const express = require('express')
const {
    createPoll,
    getPolls,
    updatePoll
} = require('../controllers/pollController')

const router = express.Router()

router.get('/', getPolls)

router.post('/', createPoll)

router.patch('/:id', updatePoll)


module.exports = router