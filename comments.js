// Create web server
// 1. get comments list
// 2. add comments
// 3. delete comments
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// 1. get comments list
router.get('/list', function(req, res) {
    Comment.fetch(function(err, comments) {
        if (err) {
            console.log(err);
        }
        res.json({ status: 0, result: comments });
    });
});

// 2. add comments
router.post('/add', function(req, res) {
    var _comment = req.body;
    var comment = new Comment(_comment);
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        res.json({ status: 0, result: comment });
    });
});

// 3. delete comments
router.delete('/delete', function(req, res) {
    var _id = req.query.id;
    if (_id) {
        Comment.remove({ _id: _id }, function(err, comment) {
            if (err) {
                console.log(err);
            }
            res.json({ status: 0, result: comment });
        });
    }
});

module.exports = router;