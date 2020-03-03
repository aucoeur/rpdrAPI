// const path = require('path');
const express = require('express')
const router = express.Router(); 

const userRoutes = require('./user');
const apiRoutes = require('./api');

router.use('/', userRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    // res.sendFile(path.resolve('./docs'), undefined, err => {
    //     if (err) next(err);
    // });
    res.redirect('https://aucoeur.github.io/rpdr_API/')
    // res.send('START YOUR ENGINES AND MAY THE BEST QUERY WIN');
});

router.get('/*', (req, res) => {
    res.status(400).json({ message: 'no route found.' });
});

module.exports = router;