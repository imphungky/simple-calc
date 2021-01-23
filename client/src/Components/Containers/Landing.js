import React from "react";
import Grid from "@material-ui/core/Grid";
import Calculator from "../Specialized/Calculator.js";


function Grades() {
    return (
    <Grid item container direction="column" justify="center" alignContent="center" alignItems="center" spacing={4}>
        <Grid item>
        <Calculator />
        </Grid>
    </Grid>
    );
}
export default Grades