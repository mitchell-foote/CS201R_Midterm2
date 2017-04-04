var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Talk = mongoose.model('Talk');

router.get('/talks', function (req, res, next) {
    Talk.find(function (err, comments) {
        if (err) { return next(err); }
        res.json(comments);
    });
});

router.post('/talks', function (req, res, next) {
    console.log("in post");
    console.log(req.body);
    var comment = new Talk(req.body);
    console.log("talk made");
    comment.save(function (err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});
router.delete('/talks/:talk', function (req, res) {
    console.log("in Delete");
    req.talk.remove();
    res.json(req.talk);
});
router.param('talk', function (req, res, next, id) {
    var query = Talk.findById(id);
    query.exec(function (err, talk) {
        if (err) { return next(err); }
        if (!talk) { return next(new Error("can't find talk")); }
        req.talk = talk;
        return next();
    });
});

router.get('/talks/:talk', function (req, res) {
    res.json(req.talk);
});

router.put('/talks/:talk/upvote', function (req, res, next) {
    console.log("in put");
    conosle.log(req.talk);
    req.talk.upvote(function (err, talk) {
        if (err) { return next(err); }
        res.json(talk);
    });
});
module.exports = router;