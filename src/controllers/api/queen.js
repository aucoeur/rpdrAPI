const express = require('express')
const router = express.Router() 

const Queen = require('../../models/queen')
const Season = require('../../models/season')
const User = require('../../models/user')


// GET list of Queens at api/queen/all
router.get('/all', (req, res) => {
    Queen.find().then(result => {
        res.json(result);
    })
})

// GET specific Queen at api/queen/:id
router.get('/:id', (req, res) => {
    Queen.findOne({ _id: req.params.id })
        .populate('seasons', 'seriesType seasonNumber')
        .then(result => {
        res.json(result);
        })
})


// POST new Queen at queen
router.post('/', (req, res) => {
  if (!req.user) {
    res.send({ err: 'Must be logged in' })
  } else {
    const queen = new Queen(req.body)
    queen.added_by = req.user._id
    queen.seasons = req.seasonId
    queen
      .save()
      .then(() => {
          return Season.findById(req.seasonId)
      })
      .then(season => {
        if (!req.seasonId) {
          res.json(queen)
        } else {
            season.queens.push(queen)
            season.save()
            res.json(queen)
        }
      }).catch(err => {
          console.log(err.message)
          res.send(err.message)
      })
  }
})

// UPDATE Queen at /queen/:id
router.put('/:id', (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Queen content can not be empty"
        });
    }

    // Find queen and update it with the request body
    Queen.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(queen => {
        queen.seasons.pop(req.seasonId)
        queen.seasons.push(req.seasonId)
        queen.save()
        res.json(queen)
    })
    .then(queen => {
        season.queens.push(queen)
        res.json(queen)
        return season.save()
    }).catch(err => {
        console.log(err.message)
        res.send(err.message)
    });
});

  // DELETE Queen at /queen/:id
  router.delete("/:id", (req, res) => {
    if (!req.user) {
      res.send({ err: 'Must be logged in' })
    } else {
      Queen.deleteOne( {_id: req.params.id} )
        .then(function(err, queen) {
          res.send('Entry deleted');
          })
      .catch(err => {
        console.log(err.message);
      });
    }
  });

module.exports = router