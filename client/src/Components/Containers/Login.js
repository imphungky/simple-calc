import {
  ArrowForwardIcon,
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

import { clearErr } from "../../Actions/errorActions.js";
import { loadUser, login } from "../../Actions/userActions.js";

function Login({ isLogged, login, invalidUser, invalidPass, clearErr }) {
  const history = useHistory();
  const [passwordview, setpasswordview] = useState(() => false);
  function validateUser(value) {
    let error;
    if (!value) {
      error = "Username is required";
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

  async function handlesubmit(user, pass) {
    login(user, pass);
  }

  useEffect(() => {
    if (isLogged) {
      history.push("/profile");
    }
  }, [isLogged, history]);

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
            Login
          </Heading>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                clearErr();
                actions.setSubmitting(true);
                handlesubmit(values.username, values.password);
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
                            placeholder="Password"
                            id="password"
                          />
                          <InputRightElement>
                            <IconButton
                              variant="ghost"
                              onClick={() => setpasswordview(!passwordview)}
                              icon={
                                passwordview ? <ViewIcon /> : <ViewOffIcon />
                              }
                            />{" "}
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    colorScheme={
                      props.values.username.length > 0 &&
                      props.values.password.length > 0 &&
                      props.isValid
                        ? "green"
                        : "gray"
                    }
                    isLoading={props.isSubmitting}
                    rightIcon={<ArrowForwardIcon boxSize={5} />}
                    type="submit"
                  />
                </Stack>
              </Form>
            )}
          </Formik>
          <Box w="100%" pt={2}>
            {invalidUser && (
              <Alert status="error" variant="top-accent">
                {" "}
                <AlertIcon /> <AlertTitle>User does not exist</AlertTitle>{" "}
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
      </Center>
    </SlideFade>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
    invalidUser: state.error.invalidUser,
    invalidPass: state.error.invalidPass,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    },
    loadUser: () => {
      dispatch(loadUser());
    },
    clearErr: () => {
      dispatch(clearErr());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
