import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {login, loadUser} from "../../Actions/userActions.js";
import {clearErr} from "../../Actions/errorActions.js";
import {useHistory} from "react-router-dom";
import {
    ArrowForwardIcon,
    InfoIcon,
    LockIcon,
    ViewIcon,
    ViewOffIcon
} from "@chakra-ui/icons";
import {
    Center, 
    Flex, 
    Input, 
    Stack,
    InputLeftAddon,
    InputRightElement,
    InputGroup,
    Button,
    IconButton,
    FormControl,
    Heading,
    SlideFade,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box
} from "@chakra-ui/react";
import {Formik, Field, Form} from "formik";

function Login({isLogged, loadUser, login, invalidUser, invalidPass, clearErr}) {
    const history = useHistory();
    const[passwordview, setpasswordview] = useState(()=> false);
    function validateUser(value) {
        let error
        if(!value) {
            error = "Username is required";
        }
        return error;
    }
    function validatePass(value) {
        let error
        if(!value) {
            error = "Password is required";
        }
        return error;
    }

    async function handlesubmit(user, pass) {
        login(user, pass);

    }

    useEffect(() => {
        if(isLogged) {
            history.push("/profile");
        }
    },[isLogged, history]);

    return (
        <SlideFade in>
        <Center>
        <Flex direction="column" align="center" justify="center" width="s" height="lg">
            <Heading as="h4" p="3">
                Login
            </Heading>
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        clearErr();
                        actions.setSubmitting(true);
                        handlesubmit(values.username, values.password);
                        actions.setSubmitting(false);
                    }, 200)
                }}
                
            >
                {props => (
                    <Form>
                        <Stack spacing={2}>
                        <Field name="username"  validate={validateUser} >
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.username && form.touched.username}>
                                    <InputGroup>
                                        <InputLeftAddon children={<InfoIcon />}/>
                                            <Input {...field} id="username" placeholder="Username"/>
                                        </InputGroup>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password"  validate={validatePass}>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <InputGroup>
                                        <InputLeftAddon children={<LockIcon />}/>
                                            <Input {...field} type={passwordview ? "text" :"password"} placeholder="Password" id="password" />
                                        <InputRightElement>
                                            <IconButton variant="ghost" onClick={() => setpasswordview(!passwordview)} icon={passwordview? <ViewIcon /> : <ViewOffIcon />} />                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            )}
                        </Field>
                        <Button isLoading={props.isSubmitting} rightIcon={<ArrowForwardIcon boxSize={5}/>} type="submit">
                        </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Flex>
        </Center>
        <Flex justify="center" w="100%">
            <Box w={["50%","30%","15%"]}>
            {invalidUser && <Alert status="error" variant="top-accent"> <AlertIcon /> <AlertTitle>User does not exist</AlertTitle> </Alert>}
            {invalidPass && <Alert status="error" variant="top-accent"> <AlertIcon /> <AlertTitle>Incorrect Password</AlertTitle> </Alert>}
            </Box>
        </Flex>
        </SlideFade>
    );
}

async function SubmitForm(login, username, password) {
    login(username, password);
}

function mapStateToProps(state) {
    return {
        isLogged: state.user.isLogged,
        invalidUser: state.error.invalidUser,
        invalidPass: state.error.invalidPass
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);