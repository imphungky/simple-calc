const router = require('express').Router();
let User = require('../models/user.model.js');

router.route('/get').get((req, res) => {
    User.find(req.body.username)
    .then((user) => {
        if(user.password == req.body.password) {
            res.status(200).json(user);
            
        }
        else {
            res.status(409);
        }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/post').post((req, res) => {
    newUser = new User(req.body);

    newUser.save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));

    
})

module.exports = router;