const express = require('express')
const router = express.Router(); // eslint-disable-line new-cap

const Season = require('../models/season')

// POST new Season
router.post('/create', (req, res) => {
    const season = new Season(req.body)
    season.save().then(result => {
        res.json(result)
    })
})

// GET list of Seasons
router.get('/', (req, res) => {
  Season.find().then(result => {
    res.json(result);
  })
})

// GET specific Season
router.get('/:id', (req, res) => {
  Season.findOne({_id: req.params.id}).then(result => {
    res.json(result);
  })
})

module.exports = router