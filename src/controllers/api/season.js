const express = require('express')
const router = express.Router(); // eslint-disable-line new-cap

const Season = require('../../models/season')

// POST new Season
router.post('/create', (req, res) => {
  if (!req.user) {
      res.send({ err: 'Must be logged in' })
    } else {
    const season = new Season(req.body)
    season.save().then(result => {
        res.json(result)
    })
  }
})

  // UPDATE Season at api/season/:id
  router.put("/:id/update", (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Season content can not be empty"
        });
    }

    // Find note and update it with the request body
    Season.findByIdAndUpdate(req.params.id, {
        seasonNumber: req.body.seasonNumber,
        premiereDate: req.body.premiereDate,
        seriesType: req.body.seriesType
    }, {new: true})
    .then(season => {
        if(!season) {
            return res.status(404).send({
                message: "Season not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Season not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Season not found with id " + req.params.id
        });
    });
});


// GET list of Seasons
router.get('/all', (req, res) => {
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