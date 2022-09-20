const { default: mongoose } = require('mongoose');
const Poll = require('../models/pollModel')

//Create a new Poll
const createPoll = async (req, res) => {
    const {title, firstPollOption, secondPollOption} = req.body
    const firstPollResult = 0, secondPollResult = 0;

    //add poll to DB
    try {
        const poll = await Poll.create({title, firstPollOption, secondPollOption, firstPollResult, secondPollResult})
        res.status(200).json(poll)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Get all Polls
const getPolls = async (req, res) => {
    const polls = await Poll.find({}).sort({createdAt: -1})
    res.status(200).json(polls)
}

//Update a Poll
const updatePoll = async (req, res)  => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such poll'})
    }

    const poll = await Poll.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    console.log(poll.firstPollResult)
    console.log(poll.secondPollResult)
    if (!poll) {
        res.status(400).json({error: 'No such poll'})
    }

    res.status(200).json(poll)
}

module.exports = {
    createPoll,
    getPolls,
    updatePoll
}