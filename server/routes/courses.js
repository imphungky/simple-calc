const router = require("express").Router();
const { auth } = require("./auth.js");

let Course = require("../models/courses.model.js");
router.route("/fetch").get(auth, (req, res) => {
  Course.find({ username: req.user })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete").delete(auth, (req, res) => {
  Course.deleteOne(
    { username: req.body.username, coursename: req.body.coursename },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.route("/add").post(auth, (req, res) => {
  let body = {
    username: req.user,
    ...req.body,
  };
  newCourse = new Course(body);
  newCourse
    .save()
    .then(() => res.json({ courseinfo: body }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update").post((req, res) => {
  res.status(200);
  Course.exists(
    { username: req.body.username, coursename: req.body.coursename },
    (err, result) => {
      if (result) {
        Course.updateOne(
          { username: req.body.username, coursename: req.body.coursename },
          { grades: req.body.grades, finalgrade: req.body.finalgrade }
        )
          .then(() => res.status(200).json("Course added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        newCourse = new Course(req.body);
        newCourse
          .save()
          .then(() => res.json("Course added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    }
  );
});

router.route("/post").post((req, res) => {
  newCourse = new Course(req.body);
  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
