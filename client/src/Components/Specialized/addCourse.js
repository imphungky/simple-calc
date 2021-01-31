import React from 'react';
import AddCourseButton from "./addCourseModal.js";
import {
  Flex, 
  Box,
  SlideFade
} from "@chakra-ui/react";

export default function AddCourse({handler, animationprop}) {



  return (
    <SlideFade in={animationprop}>
      <Flex direction="column" justify="center" alignItems="center" bg="#6ABFFD" borderRadius={4} rounded="md">
        <Box fontWeight="semibold" color="white" as="h4" fontSize="4xl" isTruncated mb="5">
          Add Course
        </Box>
        <AddCourseButton handler={handler}/>
      </Flex>
    </SlideFade>
  );

}