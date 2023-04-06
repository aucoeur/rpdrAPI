const express = require('express')
const router = express.Router({ mergeParams: true }); // eslint-disable-line new-cap

const Episode = require('../../models/episode');
const Season = require('../../models/season')

// GET list of Episodes
router.get('/', async (req, res) => {
    await Episode.find()
    .then(result => {
        res.json(result);
    }).catch(err => {
        res.send({error: err.message});
      })
})

// GET specific Episode
router.get('/:id', async (req, res) => {
    await Episode.findOne({_id: req.params.id})
    .then(result => {
        res.json(result);
    }).catch(err => {
        res.send({error: err.message});
      })
})

// POST new Episode
router.post('/', (req, res) => {
    if (!req.user) {
        res.send({ err: 'Must be logged in' })
    } else {
        const episode = new Episode(req.body)
        episode.season = req.seasonId
        episode
            .save()
            .then(() => {
                return Season.findById(req.seasonId)
            })
            .then(season => {
                season.episodes.push(episode)
                season.save();
                res.json(episode)
            }).catch(err => {
                console.log(err.message)
                res.send(err.message)
            })
        }
    })

// UPDATE Episode at /episode/:id
router.put("/:id", (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Episode content can not be empty"
        });
    }
    // Find episode and update it with the request body
    Episode.findByIdAndUpdate( { _id: req.params.id }, req.body, {new: true})
    .then(episode => {
        episode.season = req.seasonId
        episode.save()
        res.json(episode)
    })
    .then(episode => {
        season.episodes.push(episode)
        res.json(episode)
        return season.save()
    }).catch(err => {
        console.log(err.message)
        res.send(err.message)
    });
});

// DELETE Episode at /episode/:id
router.delete("/:id", (req, res) => {
if (!req.user) {
    res.send({ err: 'Must be logged in' })
} else {
    Episode.deleteOne( {_id: req.params.id} )
    .then(function(err, episode) {
        res.send('Entry deleted');
        })
    .catch(err => {
    console.log(err.message);
    });
}
});


module.exports = router
