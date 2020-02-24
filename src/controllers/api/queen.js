const express = require('express')
const router = express.Router(); // eslint-disable-line new-cap

const Queen = require('../../models/queen')

// POST new Queen at api/queen/create
router.post('/create', (req, res) => {
  const queen = new Queen(req.body)
  queen.save().then(result => {
    res.json(result)
  })
})

// GET list of Queens at api/queen/all
router.get('/all', (req, res) => {
  Queen.find().then(result => {
    res.json(result);
  })
})

// GET specific Queen at api/queen/:id
router.get('/:id', (req, res) => {
  Queen.findOne({_id: req.params.id}).then(result => {
    res.json(result);
  })
})

module.exports = router