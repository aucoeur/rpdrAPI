const router = require('express').Router();

const queenRouter = require('./queen');
const seasonRouter = require('./season');

router.use('/queen', queenRouter);
router.use('/season', seasonRouter);

router.use('/*', (req, res) => {
    res.status(400).json({ message: 'No route found.' });
});

module.exports = router;