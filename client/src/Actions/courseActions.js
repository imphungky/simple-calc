import axios from "axios";
import setAuthToken from "../utils/setAuth.js";
import axiosConfig from "../utils/axiosConfig";

export const loadCourse = (course) => async dispatch => {
    dispatch({
        type: "LOAD_COURSE",
        payload: course      
    });


};

export const addCourse = (course) => async dispatch => {
    if(localStorage.token != null) {
        setAuthToken(localStorage.token);
    }
    let body = {
        grades: course.grades,
        coursename: course.coursename,
        finalgrade: course.finalgrade
    }
    axiosConfig.post("/courses/add", body)
    .then((res) => dispatch({
        type: "COURSE_ADDED",
        payload: res.data.courseinfo
    }))
    .catch(err => console.log(err));
}

export const deleteCourse = (course, id) => async dispatch => {
    if(localStorage.token != null) {
        setAuthToken(localStorage.token);
    }
    axiosConfig.delete("/courses/delete", {data: course})
    .then((res) => dispatch({
        type: "COURSE_REMOVED",
        payload: id
    }))
    .catch((err) => console.log(err));
}

export const updateCourse = (course) => async dispatch => {
    let body = {
        grades: course.grades,
        username: course.username,
        coursename: course.coursename,
        finalgrade: course.finalgrade
    };
    axiosConfig.post("/courses/update", body)
    .then((res) => console.log(res))
    .catch(err => console.log(err));
};