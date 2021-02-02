import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { AiFillInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";
import { IoTextOutline } from "react-icons/io5";
import * as Yup from "yup";

const TaskSchema = Yup.object().shape({
  name: Yup.string().max(60, "Task name is too long!"),
  status: Yup.object().shape({
    name: Yup.string(),
    color: Yup.string(),
  }),
  course: Yup.string(),
  tags: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      color: Yup.string(),
    })
  ),
});

function Task({ task, courses, handleDeletion }) {
  const fields = {
    name: `name-${task._id}`,
    status: `status-${task._id}`,
    course: `course-${task._id}`,
    tags: `tags-${task._id}`,
    description: `description-${task._id}`,
  };
  return (
    <Formik
      initialValues={{
        [fields.name]: task.name,
        [fields.status]: task.status,
        [fields.course]: task.course,
        [fields.tags]: task.tags,
        [fields.description]: task.description,
      }}
      validationSchema={TaskSchema}
    >
      <Tr>
        <Td>
          <Field name={fields.name}>
            {({ field, form }) => (
              <Editable
                placeholder="Name"
                value={field.value}
                onChange={(nextValue) => {
                  if (nextValue.length <= 60) {
                    form.setFieldValue(fields.name, nextValue);
                  }
                }}
              >
                <EditablePreview w="12vw" />
                <EditableInput w="12vw" />
              </Editable>
            )}
          </Field>
        </Td>
        <Td>
          {task.status ? (
            <Badge colorScheme={task.status.color}>{task.status.name}</Badge>
          ) : null}
        </Td>
        <Td>
          <Select
            variant="unstyled"
            placeholder="Select Course"
            value={task.course ? task.course : "None"}
          >
            {courses.map((course, index) => {
              return (
                <option key={index} value={course}>
                  {course}
                </option>
              );
            })}
          </Select>
        </Td>
        <Td>
          {task.tags.map((tag, index) => {
            return (
              <Badge key={index} colorScheme={tag.color}>
                {tag.name}
              </Badge>
            );
          })}
        </Td>
        <Td>
          <HStack>
            <Field name={fields.description}>
              {({ field, form }) => (
                <Editable
                  placeholder="Description"
                  value={field.value}
                  onChange={(nextValue) => {
                    if (nextValue.length <= 120) {
                      form.setFieldValue(fields.description, nextValue);
                    }
                  }}
                >
                  <EditablePreview w="12vw" />
                  <EditableInput w="12vw" />
                </Editable>
              )}
            </Field>
            <IconButton
              aria-label="Delete task"
              icon={<DeleteIcon />}
              variant="ghost"
              onClick={() => handleDeletion(task._id)}
            />
          </HStack>
        </Td>
      </Tr>
    </Formik>
  );
}

function TaskTable({ tasks }) {
  const [userTasks, setUserTasks] = useState(tasks);

  const handleAddition = () => {
    setUserTasks([
      ...userTasks,
      {
        _id: userTasks.length + 1,
        name: "",
        course: "",
        status: null,
        tags: [],
        description: "",
      },
    ]);
  };

  const handleDeletion = (id) => {
    const newTasks = userTasks.filter((task) => task._id !== id);
    setUserTasks(newTasks);
  };

  return (
    <Table variant="simple" w="60%">
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
        {userTasks.map((task, index) => {
          return (
            <Task
              key={index}
              task={task}
              courses={["csc301", "csc343", "csc373", "mat232", "None"]}
              handleDeletion={handleDeletion}
            />
          );
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>
            <IconButton
              aria-label="Add task"
              icon={<AiOutlinePlus />}
              variant="ghost"
              onClick={handleAddition}
            />
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
export default TaskTable;
