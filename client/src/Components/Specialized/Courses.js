import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

export default function Courses({
  course,
  index,
  handler,
  gradeColour,
  animationprop,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const [courseinfo, setcourseinfo] = useState(() => {
    return course;
  });

  useEffect(() => {
    if (course) {
      setcourseinfo(course);
    }
  }, [course]);

  return (
    <SlideFade in={animationprop} unmountOnExit={false}>
      <Flex
        justify="center"
        alignItems="center"
        value={index}
        bg="#6ABFFD"
        direction="column"
        rounded="md"
        p="8"
      >
        {/* <Flex justify="center"direction="column" alignItems="center" borderRadius={4}> */}
        <Box
          fontWeight="semibold"
          color="white"
          as="h4"
          fontSize={"4xl"}
          maxW={["25vw", "25vw", "15vw"]}
          isTruncated
          mb="2"
        >
          {courseinfo.coursename}
        </Box>
        <Box
          fontWeight="semibold"
          color={gradeColour(courseinfo.finalgrade)}
          as="h5"
          fontSize="2xl"
          isTruncated
          mb="10"
        >
          {courseinfo.finalgrade == -1
            ? "No Grades"
            : courseinfo.finalgrade + "%"}
        </Box>
        <Box isTruncated>
          <IconButton
            isRound
            mr="5"
            size="md"
            value={index}
            onClick={(e) => handler(e, "MODIFY")}
            icon={<EditIcon />}
          ></IconButton>
          <IconButton
            isRound
            ml="5"
            size="md"
            onClick={onOpen}
            icon={<DeleteIcon />}
          ></IconButton>
        </Box>
        {/* </Flex> */}
        <Modal
          isCentered
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Course?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                ref={initialRef}
                colorScheme="blue"
                value={index}
                onClick={(e) => {
                  onClose();
                  handler(e, "REMOVE");
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </SlideFade>
  );
}
