const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    username: {type: String, required: true},
    grades: {type: Array, required: true}
}, {});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;