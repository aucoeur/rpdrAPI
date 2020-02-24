const router = require('express').Router(); // eslint-disable-line new-cap

const authRoutes = require('./auth');
const apiRoutes = require('./api');

router.use('/', authRoutes);
router.use('/api', apiRoutes);

router.use('/*', (req, res) => {
    res.status(400).json({ message: 'No route found.' });
});

module.exports = router;