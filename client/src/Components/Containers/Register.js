import {
  ArrowForwardIcon,
  EmailIcon,
  InfoIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { clearErr } from "../../Actions/errorActions";
import { loadUser, register } from "../../Actions/userActions";

function Register({
  isLogged,
  invalidUser,
  invalidPass,
  invalidEmail,
  clearErr,
  register,
  isLoaded,
}) {
  const [passwordview, setpasswordview] = useState(() => false);
  // const[isLoading, setLoading] = useState(false);
  const history = useHistory();

  function validateUser(value) {
    let error;
    if (!value) {
      error = "Username is required";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validatePass(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  function SubmitForm(username, email, password) {
    register(email, username, password);
  }

  useEffect(() => {
    if (isLoaded && isLogged) {
      loadUser();
      history.push("/profile");
    }
  }, [isLogged, history, isLoaded]);

  return (
    <SlideFade in>
      <Center>
        <Flex
          direction="column"
          align="center"
          justify="center"
          width="s"
          height="lg"
        >
          <Heading as="h4" p="3">
            Register
          </Heading>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                actions.setSubmitting(true);
                clearErr();
                SubmitForm(values.username, values.email, values.password);
                actions.setSubmitting(false);
              }, 200);
            }}
          >
            {(props) => (
              <Form>
                <Stack spacing={2}>
                  <Field name="username" validate={validateUser}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <InputGroup>
                          <InputLeftAddon children={<InfoIcon />} />
                          <Input
                            {...field}
                            id="username"
                            placeholder="Username"
                          />
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <InputGroup>
                          <InputLeftAddon children={<EmailIcon />} />
                          <Input {...field} placeholder="Email" id="email" />
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Divider />
                  <Field name="password" validate={validatePass}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <InputGroup>
                          <InputLeftAddon children={<LockIcon />} />
                          <Input
                            {...field}
                            type={passwordview ? "text" : "password"}
                            id="passfield"
                            placeholder="Password"
                          />
                          <InputRightElement>
                            <IconButton
                              variant="ghost"
                              onClick={() => setpasswordview(!passwordview)}
                              icon={
                                passwordview ? <ViewIcon /> : <ViewOffIcon />
                              }
                            />
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    isLoading={props.isSubmitting}
                    rightIcon={<ArrowForwardIcon boxSize={5} />}
                    type="submit"
                  ></Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Flex>
      </Center>
      <Flex justify="center" w="100%">
        <Box w={["50%", "30%", "15%"]}>
          {invalidUser && (
            <Alert status="error" variant="top-accent">
              <AlertIcon /> <AlertTitle>Username is taken</AlertTitle>{" "}
            </Alert>
          )}
          {invalidEmail && (
            <Alert status="error" variant="top-accent">
              <AlertIcon />
              <AlertTitle>Email is taken</AlertTitle>{" "}
            </Alert>
          )}
          {invalidPass && (
            <Alert status="error" variant="top-accent">
              {" "}
              <AlertIcon /> <AlertTitle>Incorrect Password</AlertTitle>{" "}
            </Alert>
          )}
        </Box>
      </Flex>
    </SlideFade>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
    isLoaded: state.user.isLoaded,
    invalidUser: state.error.invalidUser,
    invalidPass: state.error.invalidPass,
    invalidEmail: state.error.invalidEmail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (email, username, password) => {
      dispatch(register(email, username, password));
    },
    loadUser: () => {
      dispatch(loadUser());
    },
    clearErr: () => {
      dispatch(clearErr());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
