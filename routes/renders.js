const express = require('express')
const router = express.Router()

// ROUTING REQUESTS 
router.get('/', function(req, res){
    res.render('base_page.html', {root: __dirname});
});

router.get('/:var(e|E)', function(req, res){
    res.render('test_page.html', {root: __dirname});
});

router.get('/animation', function(req, res){
    res.render('test_animation_page.html');
});

router.get('/canvas', function(req, res){
    res.render('test_canvas_page.html');
});

router.get('/about', function(req, res){
    res.render('about.html');
});


module.exports = router