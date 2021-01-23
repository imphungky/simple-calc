import React, {useEffect, useState, useRef} from 'react';
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
  Flex,
  Box,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";


export default function Courses({course, index, handler, gradeColour}) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef();

  const [courseinfo, setcourseinfo] = useState(() => {
    return course;
  });



  useEffect(() => {
    if(course) {
      setcourseinfo(course)
    }
  }, [course]);

  return (
    <Flex justify="center" value={index} bg="#6ABFFD" direction="column" h={["40vh", "40vh", "40vh", "25vh"]} rounded="md">
      <Flex justify="center"direction="column" alignItems="center" borderRadius={4}>
        <Box fontWeight="semibold" color="white" as="h4" fontSize={"4xl"}  maxH="30%" maxW={["25vw","25vw","15vw"]} isTruncated mb="2">
          {courseinfo.coursename}
        </Box>
        <Box fontWeight="semibold" color={gradeColour(courseinfo.finalgrade)} as="h4" fontSize="3xl" isTruncated mb="10">
          {courseinfo.finalgrade}%
        </Box>
        <Box>
        <IconButton isRound mr="5"size="md" value={index} onClick={(e) => handler(e, "MODIFY")}icon={<EditIcon />}></IconButton>
          <IconButton isRound ml="5" size="md"  onClick={onOpen}icon={<DeleteIcon />}></IconButton>
        </Box>
      </Flex>
      <Modal isCentered initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Course?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button ref={initialRef} colorScheme="blue" value={index} onClick={(e) => {onClose(); handler(e, "REMOVE");}}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );

}