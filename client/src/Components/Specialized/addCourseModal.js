import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

function AddCourseButton({ handler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coursename, setcoursename] = useState("");
  const initialRef = useRef();
  function addCourse(e) {
    e.currentTarget.value = coursename;
    handler(e, "ADD");
    onClose();
  }

  return (
    <>
      <IconButton
        isRound
        size="lg"
        variant="ghost"
        onClick={onOpen}
        icon={<AddIcon color="white" />}
      ></IconButton>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              ref={initialRef}
              placeholder="Course Name"
              onChange={(e) => setcoursename(e.target.value)}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={(e) => addCourse(e)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCourseButton;
