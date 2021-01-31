import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import authAction from "../../Actions/authActions";
import { addCourse, deleteCourse } from "../../Actions/courseActions.js";
import { expiredSession } from "../../Actions/userActions.js";
import AddCourse from "../Specialized/addCourse.js";
import Calculator from "../Specialized/Calculator.js";
import Courses from "../Specialized/Courses.js";

function Profile({ grades, verified, authAction, isLoaded, isLogged }) {
  const [showcourseanimation, setshowcourseanimation] = useState(() => true);
  const [displaycourses, setCourses] = useState([]);
  const [modifycourse, setmodify] = useState();
  const [showcourses, setshowcourses] = useState(() => true);

  const history = useHistory();
  /*

    All button handlers get handled in this function and pass in a type
    to differentiate the different buttons that were activated to know what action to handle


    */

  function redirect(e, type) {
    //set our current state to which distinct course the user wants to edit
    if (type === "MODIFY") {
      const id = e.currentTarget.value;
      setmodify(displaycourses[id]);
      setshowcourses(false);
    }
    //get course id from the button clicked and dispatch the delete action
    //update local state, unsure if this is necessary as the action should update the state as well but this ensures it
    else if (type === "REMOVE") {
      const id = e.currentTarget.value;
      let params = [displaycourses[id], id];
      dispatchauth(authAction, deleteCourse, params);
    }
    //add a new course and dispatch the action to add it to the database
    else if (type === "ADD") {
      let info = {
        grades: [
          [true, "", "", ""],
          [true, "", "", ""],
          [true, "", "", ""],
        ],
        coursename: e.currentTarget.value,
        finalgrade: -1,
      };
      let params = [info];
      dispatchauth(authAction, addCourse, params);
    }
  }

  function gradeColour(grade) {
    grade = Math.floor(grade);
    if (0 <= grade && grade < 60) {
      return "#ff0000";
    } else if (60 <= grade && grade <= 75) {
      return "#fff133";
    } else if (76 <= grade && grade <= 100) {
      return "#89ff57";
    } else {
      return "white";
    }
  }

  /*
    Takes the courses we have in state and renders it
    */
  function renderCourses() {
    let display = [];
    if (displaycourses.length > 0) {
      for (var i = 0; i < displaycourses.length; i++) {
        // display.push( <Grid item key={"Grid" + i} m={6} lg={4}><Courses handler={redirect} key={i} index={i} course={displaycourses[i]}/></Grid>);
        display.push(
          <Courses
            animationprop={showcourseanimation}
            handler={redirect}
            key={i}
            index={i}
            course={displaycourses[i]}
            gradeColour={gradeColour}
          />
        );
      }
    }
    display.push(
      <AddCourse handler={redirect} animationprop={showcourseanimation} />
    );
    return display;
  }

  /*
    If the user is already authorized/loggedin redirect them outside
    */

  useEffect(() => {
    if (isLoaded) {
      setCourses(grades);
    }
    if (isLoaded && !verified) {
      history.push("/verify");
    }
    if (isLoaded && !isLogged) {
      history.push("/");
    }
  }, [isLoaded, verified, history, grades, isLogged]);

  //parse grades but only keep the final grade and the course name

  return (
    <Box
      aligntItems="center"
      alignContent="center"
      justify="center"
      mt="15"
      w="100%"
      h="100%"
    >
      {isLoaded && (
        <Tabs variant="soft-rounded" colorScheme="blue" align="center" p="5">
          <TabList>
            <Tab
              onClick={() => {
                setshowcourses(true);
                setshowcourseanimation(true);
              }}
            >
              Courses
            </Tab>
            <Tab
              onClick={() => {
                setshowcourseanimation(false);
              }}
            >
              Overview{" "}
              <Badge ml="2" variant="subtle" colorScheme="yellow">
                Coming Soon
              </Badge>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex justify="center" w="100%" h={["100%"]}>
                {showcourses && (
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    w={["90%", "90%", "80%", "50%"]}
                    spacing={3}
                  >
                    {renderCourses()}
                  </SimpleGrid>
                )}
                {!showcourses && (
                  <Calculator
                    key={0}
                    handle={setshowcourses}
                    course={modifycourse}
                    gradeColour={gradeColour}
                  />
                )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <p>Coming Soon!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
      {!isLoaded && (
        <Flex
          h="100vh"
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  );
}

async function dispatchauth(authAction, action, params) {
  authAction(action, params);
}

function mapStateToProps(state) {
  /*
    our courses should be an objects as such
    {
        grades: [['], [']]
        username: String,
        coursename: String,
        finalgrade: number
    }

    */
  return {
    grades: state.user.grades,
    verified: state.user.verified,
    isLoading: state.user.isLoading,
    isLoaded: state.user.isLoaded,
    isLogged: state.user.isLogged,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authAction: (action, params) => {
      dispatch(authAction(action, params));
    },
    expiredSession: () => {
      dispatch(expiredSession());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
