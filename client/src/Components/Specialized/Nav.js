import React from 'react';
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import {logout} from "../../Actions/userActions.js";
import {clearErr} from "../../Actions/errorActions.js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer
} from "@chakra-ui/react";

function ButtonAppBar({isLogged, logout, clearErr, isLoaded}) {
  const history = useHistory();

  /*
  Check our global state to see if the user is logged in or not
  if they are logged in we know that the handle should log them out otherwise,
  redirect to login page
  */
  async function loginHandle() {
      clearErr();
      if(!isLogged) {
          history.push("/login");
      }
      else {
          logout();
      }
  }

  function logoHandle() {
    if(!isLogged) {
      history.push("/");
    }
  }

  /*
  Handle for clicking register 
  */
  function registerHandle() {
    clearErr();
    history.push("/register");
  }



  return (
      <Flex>
        <Box p="2">
          <Button variant="ghost" onClick={logoHandle}>
          <Heading>
            Grade-<Box as="span" color="#6ABFFD">calc</Box>
          </Heading>
          </Button>
        </Box>
          <Spacer />
        {isLoaded && !isLogged && <Box p="2">
          <Button colorScheme="red" mr="4" onClick={registerHandle}>
            Sign Up
          </Button>
          <Button bg="#6ABFFD" color="white" onClick={loginHandle}>
            Log in
          </Button>
        </Box>}
        {isLoaded && isLogged && <Box p="2"><Button bg="#6ABFFD" color="white" onClick={loginHandle}>Logout</Button> </Box>}
      </Flex>
  );
}

function mapStateToProps(state) {
    return {
      isLogged: state.user.isLogged,
      isLoading: state.user.isLoading,
      isLoaded: state.user.isLoaded
    };
}


function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(logout());
        },
        clearErr: () => {
          dispatch(clearErr());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
