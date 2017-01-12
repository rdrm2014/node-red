/**
 * Created by ricardomendes on 10/01/17.
 */
var express = require('express');
var router = express.Router();

var src = process.cwd() + '/app/';
var PeerModel = require(src + 'models/peer');

// Peers
router.get('/', isLoggedIn, function (req, res) {
    PeerModel.find({owner: req.user}, function (err, peers) {
        if (!err) {
            if (req.query['json']) {
                res.json(peers);
            } else {
                res.render('peers/index', {user: req.user, Peers: peers});
            }
        } else {
            res.statusCode = 500;

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.get('/new', isLoggedIn, function (req, res) {
    res.render('peers/new', {
        user: req.user
    });
});

router.post('/create', isLoggedIn, function (req, res) {
    console.log(req.query);
    console.log(req.body);

    var paramObj = {
        owner: req.user,
        name: req.body['name'],
        description: req.body['description'],
        ip: req.body['ip']
    };

    PeerModel.create(paramObj, function PeerCreated(err, peer) {
        if (err) {
            console.log(err);
            return res.redirect('/new');
        }
        res.redirect('show?id=' + peer.id);

    });
});

router.get('/show', isLoggedIn, function (req, res) {
    console.log(req.query['id']);
    console.log(req.body);

    PeerModel.findOne({_id: req.query['id'], owner: req.user}, function (err, peer) {
        if (err) return next(err);
        if (!peer) return next();
        console.log(peer);
        res.render('peers/show', {
            Peer: peer
        });
    });
});

router.get('/edit', isLoggedIn, function (req, res) {
    PeerModel.findOne({_id: req.query['id'], owner: req.user}, function (err, peer) {
        if (err) return next(err);
        if (!peer) return next('PeerModel doesn\'t exist.');

        res.render('peers/edit', {
            Peer: peer
        });
    });
});

router.post('/update', isLoggedIn, function (req, res) {

    var paramObj = {
        name: req.body['name'],
        description: req.body['description'],
        ip: req.body['ip']
    };

    PeerModel.update({_id: req.query['id'], owner: req.user}, paramObj, function (err) {
        if (err) {
            console.log(err);
            return res.redirect('/edit?id=' + req.query['id']);
        }
        res.redirect('/peers/show?id=' + req.query['id']);
    });
});

router.post('/destroy', isLoggedIn, function (req, res) {
    PeerModel.findOne({_id: req.body['id'], owner: req.user}, function (err, peer) {
        if (err) return next(err);

        if (!peer) return next('PeerModel doesn\'t exist.');

        PeerModel.remove({_id: req.body['id'], owner: req.user}, function (err) {

            if (err) return next(err);
        });
        res.redirect('/home');
    });
});

module.exports = router;

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}