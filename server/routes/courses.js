const router = require('express').Router();
let Course = require('../models/courses.model.js');

router.route('/get').get((req, res) => {
    Course.find(req.body.username)
    .then((user_courses) => {
        res.json(user_courses);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/post').post((req, res) => {
    newCourse = new Course(req.body);

    newCourse.save()
    .then(() => res.json('Course added!'))
    .catch((err) => res.status(400).json('Error: ' + err));

    
})

module.exports = router;