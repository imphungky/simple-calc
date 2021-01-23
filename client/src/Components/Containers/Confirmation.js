import React, {useEffect} from "react";
import {connect} from "react-redux";
import {verify} from "../../Actions/userActions.js";
import {useHistory} from "react-router-dom";
import {
    Flex,
    Heading
} from "@chakra-ui/react";
function Confirmation({match, verified, verify}) {

    const history = useHistory();

    useEffect(() => {
        if(!verified) {
            verify(match.params.id);
        }
        else {
            setTimeout(() => {
                history.push("/login");
            }, 1000);
        }
    }, [verified])



    return (
    <Flex container direction="column" justify="center" alignContent="center" alignItems="center" >
        <Heading as="h3">
        Thank you for verifying, you will be redirected shortly
        </Heading>
    </Flex>
    );
}

function mapStateToProps(state) {
    return {
        verified: state.user.verified
    };
}

function mapDispatchToProps(dispatch) {
    return {
        verify: (id) => {
            dispatch(verify(id));
        }
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);