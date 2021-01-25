const router = require('express').Router();
let User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require('../mail/sendmail.js');
const {auth, genToken} = require('./auth.js');

const saltRounds = 10;


router.route('/login').post(async (req, res) => {
    User.find({username: req.body.username})
    //research more on http statuses
    .then((users) => {
        if(users.length > 1) {
            //is this right?
            return res.status(400);
        }
        else if(users.length == 0) {
            return res.status(409).json({type: "username"});
        }
        else {
            const user = users[0];
            bcrypt.compare(req.body.password, user.password, async function(err, result) {
                if(!result) {
                    return res.status(409).json({
                        type: "password"
                    });
                }
                else {
                    let payload = await genToken(user.username);
                    if(payload != "Error") {
                        res.cookie('token', payload[1], {
                            maxAge: 1000 * 60 * 30,
                            domain: "grade-calc.com",
                            httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            overwrite: true,
                            path: "/"
                        });
                        return res.status(200).json({"token": payload[0], "verified": user.verified});
                    }
                    else {
                        return res.sendStatus(403);
                    }
                }
            });
        }
    }) //If user was not found in database, username incorrect!
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/verify').post(async (req, res)  => {
    User.findByIdAndUpdate(req.body.id, {verified: true})
    .then((user) => {
        return res.status(200).json(user.verified);
    })
    .catch((err) => {
        return res.status(403).send(err);
    });
});

router.route('/loadverify').get(auth, async (req, res)  => {
    User.findOne({username: req.user})
    .then((user) => {
        return res.status(200).json(user.verified);
    })
    .catch((err) => {
        return res.status(403).send(err);
    })
});

router.route('/refreshtoken').get(async (req, res) => {
    if(req.cookies["token"] && req.cookies["token"] != '') {
        const decoded = jwt.verify(req.cookies["token"], "secret");
        let tokens = await genToken(decoded.username);
        res.cookie('token', tokens[1], {
            maxAge: 1000 * 60 * 30,
            domain: "grade-calc.com",
            httpOnly: true,
            overwrite: true,
            sameSite: 'lax',
            path: "/"
        });
        return res.status(200).json({token: tokens[0]});
    }
    else {
        res.sendStatus(401)
    }
})

router.route('/register').post( async (req, res) => {
    User.findOne({username:req.body.username})
    .then((user) => {
        //username not taken
        if(!user) {
            User.findOne({email: req.body.email})
            .then((user) => {
                //new user register them
                if(!user) {
                    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                        newUser = new User({
                            ...req.body,
                            verified: false,
                            password: hash
                        });
                        newUser.save()
                        .then(sendMail(newUser.email, newUser._id)
                            .then(() => {
                                return res.json("user added!");
                            }));
                    });
                }
                //
                else {
                    return res.status(409).json("INVALID_EMAIL");
                }
            });
        }
        //username is taken
        else {
            return res.status(409).json("INVALID_USER");
        }
    })
})

router.route('/resend').post(auth, async (req, res) => {
    let username = req.user;
    User.findOne({username: username})
    .then((user) => {
        sendMail(user.email, user._id);
        return res.sendStatus(200);
    })
    .catch((err) => {
        return res.sendStatus(403);
    })
});

router.route('/clearcookie').delete(async (req, res) => {
    res.cookie('token', '', {
        maxAge: 1000 * 60 * 30,
        domain: "grade-calc.com",
        httpOnly: true,
        overwrite: true,
        sameSite: 'lax',
        path: "/"
    });
    res.status(200).send('cookie cleared');
})

module.exports = router;