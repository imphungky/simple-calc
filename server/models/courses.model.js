const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    username: {type: String, required: true, unique:false},
    coursename: {type: String, required: true, unique:false},
    grades: {type: Array, required: true},
    finalgrade: {type: Number, required: true}
}, {});

courseSchema.index({username: 1, coursename:1}, {unique:true})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;