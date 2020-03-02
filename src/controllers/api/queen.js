const express = require('express')
const router = express.Router() 

const Queen = require('../../models/queen')
const User = require('../../models/user')


  // POST new Queen at api/queen/create
  router.post('/create', (req, res) => {
    // console.log(req.user)
    // if (req.user) {
      const queen = new Queen(req.body);
      // queen.added_by = req.user._id;
      queen.save()
        .then(queen => {
          res.json(queen)
          // return User.findById(req.user._id);
        })
        .catch( err => {
          console.log(err.message)
        })
    // } else {
    //   res.status(401).send({
    //     status: 401,
    //     message: 'Unauthenticated'
    //   })
    // }
  })

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

module.exports = router