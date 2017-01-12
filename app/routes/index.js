/**
 * Created by ricardomendes on 10/01/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Agricultura de Precisão'});
});

router.get('/home', isLoggedIn, function (req, res) {
    res.render('home', {
        user: req.user
    });
});

router.get('/nodered', isLoggedIn, function (req, res) {
    res.redirect('/red');
});

module.exports = router;


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}