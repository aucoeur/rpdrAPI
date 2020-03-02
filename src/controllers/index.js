const path = require('path');

const router = require('express').Router(); // eslint-disable-line new-cap

const userRoutes = require('./user');
const apiRoutes = require('./api');

router.use('/user', userRoutes);
router.use('/api', apiRoutes);

router.get('/*', (req, res) => {
    // res.sendFile(path.resolve('./docs'), undefined, err => {
    //     if (err) next(err);
    // });
    res.redirect('https://aucoeur.github.io/rpdr_API/')
});

module.exports = router;