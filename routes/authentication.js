var express = require('express');

User = require('../models/user');
var bcrypt = require('bcrypt');

var router = express.Router();

router.get('/', async function(req, res) {
    res.render('authentication/login');
});

router.post('/login', async function(req, res) {
    username = req.body.username;
    pwd = req.body.password;

    const existingUser = await User.findOne({
        username: username,
    });

    if (existingUser!=null){
        if (bcrypt.compareSync(pwd, existingUser.password)) {
            const {
                password,
                ...myUser
            } = existingUser._doc;
            req.session.user = myUser;
            req.session.cart = [];
            res.redirect('/about');
        }
        else {
            res.redirect('/authentication');
        }
    }
    else {
        res.redirect('/authentication');
    }
});

router.get('/register', async function(req, res) {
    res.render('authentication/register');
});

router.post('/register', async function(req, res) {
    username = req.body.username;
    pwd = req.body.password;
    fullName = req.body.fullName;
    date = req.body.date;
    address = req.body.address;

    const hashedPassword = bcrypt.hashSync(pwd, 10);
    const token = hashedPassword + String(Date.now());

    const userData = {
        username: username,
        password: hashedPassword,
        fullName: fullName,
        date: date,
        address: address,
        type: "User",
        token: token
    }
    newUser = new User(userData);
    const createdUser = await newUser.save();

    const {
        password,
        ...myUser
    } = userData;

    req.session.user = myUser;

    if (req.session.user) {
        res.redirect('/blog');
    }
    else {
        res.redirect('/authentication/register?message=Incorrect username or password');
    }

});

router.get('/logout', function(req, res){
    res.redirect('/authentication');
});

module.exports = router;