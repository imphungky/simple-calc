import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import AddCourseButton from "./addCourseModal.js";

export default function AddCourse({ handler }) {
  return (
    <Flex
      direction="column"
      justify="center"
      alignItems="center"
      bg="#6ABFFD"
      borderRadius={4}
      rounded="md"
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
  );
}
