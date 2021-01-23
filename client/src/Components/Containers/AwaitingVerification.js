import React, {useEffect} from "react";
import {connect} from "react-redux";
import {verify} from "../../Actions/userActions.js";
import {useHistory} from "react-router-dom";

import {
    EmailIcon
} from "@chakra-ui/icons";
import {
    Center, 
    Flex, 
    Input, 
    Stack,
    InputLeftAddon,
    InputGroup,
    Icon,
    Button,
    FormControl,
    Heading,
    Box,
    SlideFade,
    Text
} from "@chakra-ui/react";


function AwaitingVerification({isLogged, isLoaded}) {


    
    return (
    <Flex direction="column" align="center" justify="center" height="lg">
        <Box>
            <Heading as="h3">
                Please check your email to verify your account
            </Heading>
        </Box>
        <Box mt="6">
            <Button size="lg" leftIcon={<EmailIcon />}>
                Resend
            </Button>
        </Box>
    </Flex>
    );
}

function mapStateToProps(state) {
    return {
        verified: state.user.verified,
        isLogged: state.user.isLogged,
        isLoaded: state.user.isLoaded
    };
}

// function mapDispatchToProps(dispatch) {
//     return {

//     };
// }



export default connect(mapStateToProps, {})(AwaitingVerification);