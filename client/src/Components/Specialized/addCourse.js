import React from 'react';
import AddCourseButton from "./addCourseModal.js";
import {
  Flex, 
  Box
} from "@chakra-ui/react";

export default function AddCourse({handler}) {



  return (
    <Flex direction="column" justify="center" alignItems="center" bg="#6ABFFD" borderRadius={4} h={["40vh", "40vh", "40vh", "25vh"]} rounded="md">
      <Box fontWeight="semibold" color="white" as="h4" fontSize="4xl" isTruncated mb="5">
        Add Course
      </Box>
      <AddCourseButton handler={handler}/>
    </Flex>
  );

}