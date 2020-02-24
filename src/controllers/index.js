const router = require('express').Router(); // eslint-disable-line new-cap

const userRoutes = require('./user');
const apiRoutes = require('./api');

router.use('/user', userRoutes);
router.use('/api', apiRoutes);

router.use('/*', (req, res) => {
    res.status(400).json({ message: 'No route found.' });
});

module.exports = router;