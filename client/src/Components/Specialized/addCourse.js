import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React from "react";

import AddCourseButton from "./addCourseModal.js";

export default function AddCourse({ handler, animationprop }) {
  return (
    <SlideFade in={animationprop}>
      <Flex
        direction="column"
        justify="center"
        alignItems="center"
        bg="#6ABFFD"
        borderRadius={4}
        rounded="md"
        p="8"
        minH="24vh"
      >
        <Box
          fontWeight="semibold"
          color="white"
          as="h4"
          fontSize="4xl"
          isTruncated
          mb="5"
        >
          Add Course
        </Box>
        <AddCourseButton handler={handler} />
      </Flex>
    </SlideFade>
  );
}
