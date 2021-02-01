import {
  Badge,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";
import { IoTextOutline } from "react-icons/io5";

function Task({ task }) {
  return (
    <Tr>
      <Td>{task.name}</Td>
      <Td>
        <Badge colorScheme={task.status.color}>{task.status.name}</Badge>
      </Td>
      <Td>{task.course}</Td>
      <Td>
        {task.tags.map((tag, index) => {
          return (
            <Badge key={index} colorScheme={tag.color}>
              {tag.name}
            </Badge>
          );
        })}
      </Td>
      <Td>{task.description}</Td>
    </Tr>
  );
}

function TaskTable({ tasks }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <HStack>
              <IoTextOutline /> <Text>Name</Text>
            </HStack>
          </Th>
          <Th>
            <HStack>
              <GrStatusUnknown /> <Text>Status</Text>
            </HStack>
          </Th>
          <Th>
            <HStack>
              <BsBook /> <Text>Course</Text>
            </HStack>
          </Th>
          <Th>
            <HStack>
              <FaTag /> <Text>Tags</Text>
            </HStack>
          </Th>
          <Th>
            <HStack>
              <AiFillInfoCircle /> <Text> Description</Text>
            </HStack>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task, index) => {
          return <Task key={index} task={task} />;
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>+</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
export default TaskTable;
