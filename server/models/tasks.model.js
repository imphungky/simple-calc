const mongoose = require("mongoose");
const colours = [
    "gray",
    "teal",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "cyan",
    "purple",
    "pink"
];


const tagSchema = mongoose.Schema(
    {
        name: String,
        colour: {type: String, enum: colours}
    }, 
    {}
);


const taskSchema = mongoose.Schema(
    {
        taskname: String,
        coursename: String,
        status: tagSchema,
        tags: [tagSchema], //subset of users' tags
        description: {type: String},
        index: Number
    },
    {}
);



module.exports = {
    taskSchema: taskSchema,
    tagSchema: tagSchema,
};
