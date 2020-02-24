const router = require('express').Router(); // eslint-disable-line new-cap

const authRoutes = require('./auth');
// const apiRoutes = require('./api');

const queenRouter = require('./queen');
const seasonRouter = require('./season');

router.use('/', authRoutes);
// router.use('api/', apiRoutes);

router.use('/queen', queenRouter);
router.use('/season', seasonRouter);

router.use('/*', (req, res) => {
    res.status(400).json({ message: 'No route found.' });
});

module.exports = router;