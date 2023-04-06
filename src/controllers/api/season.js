const express = require('express')
const router = express.Router(); // eslint-disable-line new-cap
const Season = require('../../models/season')

// GET list of Seasons
router.get('/all', async (req, res) => {
    await Season.find()
    .populate('episodes', 'episodeNumber title')
    .populate('queens', 'name')
    .then(result => {
      res.json(result);
    }).catch(err => {
        res.send({error: err.message});
      })
})

// GET specific Season
router.get('/:id', async (req, res) => {
  await Season.findOne({_id: req.params.id})
  .populate('episodes', 'episodeNumber title')
  .populate('queens', 'name')
  .then(result => {
    res.json(result);
  })
  .catch(err => {
        res.send({error: err.message});
      })
})


// POST new Season
router.post('/', (req, res) => {
  if (!req.user) {
      res.send({ err: 'Must be logged in' })
    } else {
    const season = new Season(req.body)
    season.save().then(result => {
        res.json(result)
    })
  }
})

// UPDATE Season at season/:id
router.put("/:id", (req, res) => {
  // Validate Request
  if(!req.body) {
      return res.status(400).send({
          message: "Season content can not be empty"
      });
  }

  // Find season and update it with the request body
  Season.findByIdAndUpdate(req.params.id, req.body, {new: true})
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

// DELETE Season at api/queen/:id
router.delete("/:id", (req, res) => {
  if (!req.user) {
    res.send({ err: 'Must be logged in' })
  } else {
    Season.deleteOne( {_id: req.params.id} )
      .then(function(err, season) {
        res.send('Entry deleted');
        })
    .catch(err => {
      console.log(err.message);
    });
  }
});


module.exports = router
