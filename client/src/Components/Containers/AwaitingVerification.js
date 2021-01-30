import { EmailIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import authAction from "../../Actions/authActions";
import { resendVerify } from "../../Actions/userActions";

function AwaitingVerification({
  isLogged,
  isLoaded,
  authAction,
  emailSent,
  emailError,
}) {
  const history = useHistory();

  function resendEmail() {
    authAction(resendVerify);
  }

  useEffect(() => {
    if (isLoaded && !isLogged) {
      history.push("/");
    }
  });

  return (
    <Flex direction="column" align="center" justify="center" height="lg">
      <Box>
        <Heading as="h3">
          Please check your email to verify your account
        </Heading>
      </Box>
      <Box mt="6">
        <Button
          isDisabled={emailSent || emailError}
          size="lg"
          onClick={resendEmail}
          leftIcon={<EmailIcon />}
        >
          Resend
        </Button>
      </Box>
      <Flex mt="6" w="100%" justify="center">
        <Box w={["50%", "30%", "15%"]}>
          {emailSent && (
            <Alert status="success">
              <AlertIcon />
              Email Resent
            </Alert>
          )}
          {emailError && (
            <Alert status="error">
              <AlertIcon />
              An error occurred in resending email
            </Alert>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    verified: state.user.verified,
    isLogged: state.user.isLogged,
    isLoaded: state.user.isLoaded,
    emailSent: state.user.emailSent,
    emailError: state.user.emailError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authAction: (action, params) => {
      dispatch(authAction(action, params));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AwaitingVerification);
