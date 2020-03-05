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
    // res.redirect('https://aucoeur.github.io/rpdr_API/')
    res.send('<div style="text-align: center"><h1>START YOUR ENGINES AND MAY THE BEST QUERY WIN.</h1><iframe src="https://giphy.com/embed/3otWpF7M7JDInxGaek" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br /><h2>Check the documentation here: <a href="https://aucoeur.github.io/rpdr_API/">https://aucoeur.github.io/rpdr_API/</a></h2>');
});

router.get('/*', (req, res) => {
    res.status(400).json({ message: 'no route found.' });
});

module.exports = router;