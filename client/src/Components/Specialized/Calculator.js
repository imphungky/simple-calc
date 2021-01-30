import { AddIcon, ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  SlideFade,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import authAction from "../../Actions/authActions";
import { updateCourse } from "../../Actions/courseActions.js";
function Calculator({ handle, course, authAction, gradeColour }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modifygrades, setmodify] = useState(() =>
    course
      ? course.grades
      : [
          ["", ""],
          ["", ""],
          ["", ""],
        ]
  );
  const [showfinal, setshowfinal] = useState(false);
  const [finalgrade, setfinalgrade] = useState(() =>
    course ? course.finalgrade : 0
  );
  const [calculatingGrade, setSpinner] = useState(false);
  const [confirmdeleteindex, setconfirmdelete] = useState(0);
  const initialRef = useRef();

  function removegrade(index) {
    setmodify((prev_grades) => {
      const lst = [...prev_grades];
      lst.splice(index, 1);
      calculate(lst);
      return lst;
    });
  }

  function removegradehandle(e) {
    const id = e.currentTarget.id;
    if (modifygrades[id][0] !== "" || modifygrades[id][1] !== "") {
      onOpen();
      setconfirmdelete(id);
    } else {
      removegrade(id);
    }
  }

  function handleReturn() {
    if (showfinal) {
      setshowfinal(false);
    } else {
      saveResults();
      handle(true);
    }
  }

  function checkEmptyFields(grades) {
    let emptyfields = grades.map((lst) => lst.filter((field) => field !== ""));
    if (emptyfields.filter((lst) => lst.length > 1).length == 0) {
      return true;
    }
    return false;
  }

  function calculate(grades) {
    setfinalgrade(() => {
      let grade = 0;
      let weight = 0;
      let final = 0;
      if (checkEmptyFields(grades)) {
        return -1;
      }
      for (let i = 0; i < grades.length; i++) {
        if (grades[i][0] !== "" && grades[i][1] !== "") {
          grade += (grades[i][0] * grades[i][1]) / 100;
          weight += grades[i][1] / 100;
        }
      }
      if (weight > 0) {
        final = (grade / weight).toFixed(0);
      }
      return final;
    });
  }

  async function saveResults() {
    course.grades = modifygrades;
    course.finalgrade = finalgrade;
    let params = [course];
    authAction(updateCourse, params);
  }

  function inputHandle(e) {
    setSpinner(true);
    setmodify((prev_grades) => {
      const lst = [...prev_grades];
      lst[e.target.id][e.target.name] = e.target.value;
      calculate(lst);
      return lst;
    });
    setTimeout(() => {
      setSpinner(false);
    }, 200);
  }

  function addgrade() {
    setmodify((prev_grades) => {
      return [...prev_grades, ["", ""]];
    });
  }

  function renderGrades() {
    let display = [];
    if (modifygrades !== undefined) {
      for (var i = 0; i < modifygrades.length; i++) {
        display.push(
          <Flex>
            <Input
              bg="white"
              m="2"
              id={i.toString()}
              name={"0"}
              onChange={(e) => inputHandle(e)}
              value={modifygrades[i][0]}
              key={"GradeField" + i}
              placeholder="Grade"
            ></Input>
            <Input
              bg="white"
              m="2"
              id={i.toString()}
              name={"1"}
              onChange={(e) => inputHandle(e)}
              value={modifygrades[i][1]}
              key={"WeightField" + i}
              placeholder="Weight"
            ></Input>
            <IconButton
              m="2"
              onClick={(e) => removegradehandle(e)}
              id={i.toString()}
              icon={<DeleteIcon />}
              key={"RemoveGrade" + i}
            ></IconButton>
          </Flex>
        );
      }
    }
    return display;
  }

  return (
    <Flex mt="5" minH={["40vh", "30vh", "20vh"]}>
      <SlideFade in>
        <Flex
          direction="column"
          alignItems="center"
          p="5"
          rounded="md"
          bg="#6ABFFD"
          minW="20vw"
        >
          <SimpleGrid w="100%" columns={3} mb="7" alignItems="center">
            <IconButton
              isRound
              size="md"
              w="20%"
              icon={<ArrowBackIcon />}
              onClick={() => handleReturn()}
            ></IconButton>
            <Heading color="white">{course.coursename}</Heading>
          </SimpleGrid>
          {!showfinal && renderGrades()}
          <Button m="4" w="20%" onClick={addgrade} leftIcon={<AddIcon />}>
            Add
          </Button>
          <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={initialRef}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Fields for this grade are not empty</ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  ref={initialRef}
                  onClick={() => {
                    removegrade(confirmdeleteindex);
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </SlideFade>
      <SlideFade in offsetX="-20px">
        <Box ml="3" minW="20vw" h="30vh" bg="#6ABFFD" p="5" rounded="md">
          <Heading color="white">Grade Calculated</Heading>
          <Flex
            alignContent="center"
            alignItems="center"
            justify="center"
            h="100%"
            w="100%"
          >
            {!calculatingGrade && (
              <Heading as="h1" size="3xl" color={gradeColour(finalgrade)}>
                {finalgrade == -1 ? "No Grades" : finalgrade + "%"}
              </Heading>
            )}
            {calculatingGrade && <Spinner />}
          </Flex>
        </Box>
      </SlideFade>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    authAction: (action, params) => {
      dispatch(authAction(action, params));
    },
  };
}

export default connect(undefined, mapDispatchToProps)(Calculator);
