// const path = require('path');
const express = require('express')
const router = express.Router(); 

const userRoutes = require('./user');
const apiRoutes = require('./api/queen');

router.use('/', userRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    // res.sendFile(path.resolve('./docs'), undefined, err => {
    //     if (err) next(err);
    // });
    // res.redirect('https://aucoeur.github.io/rpdr_API/')
    res.render('index');
});

router.get('/*', (req, res) => {
    res.status(400).json({ message: 'no route found.' });
});

module.exports = router;