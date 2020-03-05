const express = require('express')
const router = express.Router() 

const Queen = require('../../models/queen')
const User = require('../../models/user')


  // GET list of Queens at api/queen/all
  router.get('/all', (req, res) => {
    Queen.find().lean().then(result => {
      res.json(result);
    })
  })

  // GET specific Queen at api/queen/:id
  router.get('/:id', (req, res) => {
    Queen.findOne({
        _id: req.params.id
      }).populate('season').lean()
      .then(result => {
        res.json(result);
      })
  })


  // POST new Queen at api/queen/create
  router.post('/create', (req, res) => {
    if (!req.user) {
      res.send({ err: 'Must be logged in' })
    } else {
      const queen = new Queen(req.body)
      queen.added_by = req.user._id
      queen
        .save()
        .then(result => {
          res.json(result)
      })
    }
  })

  // UPDATE Queen at api/queen/:id
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
        if(!queen) {
            return res.status(404).send({
                message: "Queen not found with id " + req.params.id
            });
        }
        res.send(queen);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Queen not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Queen not found with id " + req.params.id
        });
    });
});

  // DELETE Queen at api/queen/:id
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