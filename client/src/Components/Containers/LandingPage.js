import { Box, Button, Flex, Heading, SlideFade, Text } from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();

  function handleGetStarted() {
    history.push("/register");
  }

  return (
    // <Center>
    <SlideFade in>
      <Flex direction="column" justify="center">
        <Heading as="h1" textAlign="center" size="4xl" mt="100">
          <Box as="span">
            Stay on top with <br />
            Grade-
            <Box as="span" color="#6ABFFD">
              calc
            </Box>
          </Box>
        </Heading>
        <Text align="center" fontSize="lg" m="3">
          Offering an easy way to{" "}
          <Box as="span" color="#6ABFFD">
            track your courses
          </Box>
          . <br />
          Register, add your courses, and start tracking - it&apos;s that easy!
        </Text>
        <Box as="span" align="center">
          <Button
            size="lg"
            bg="#6ABFFD"
            color="white"
            borderRadius="md"
            onClick={handleGetStarted}
          >
            {" "}
            Get Started
          </Button>
        </Box>
      </Flex>
      {/* {isExpired && <Alert status="info"><AlertIcon />Your Session has Expired</Alert>} */}
    </SlideFade>
    // </Center>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
    isLoaded: state.user.isLoaded,
  };
}
export default connect(mapStateToProps, {})(LandingPage);
