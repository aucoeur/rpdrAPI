const router = require('express').Router();

const queenRouter = require('./queen');
const seasonRouter = require('./season');
const episodeRouter = require('./episode');

router.use('/queen', queenRouter);
router.use('/season', seasonRouter);
router.use('/season/:seasonId/episode', function(req, res, next) {
    req.seasonId = req.params.seasonId;
    next()
}, episodeRouter);

router.use('/season/:seasonId/queen', function(req, res, next) {
    req.seasonId = req.params.seasonId;
    next()
}, queenRouter);

router.use('/*', (req, res) => {
    res.status(400).json({ message: 'No route found.' });
});

module.exports = router;