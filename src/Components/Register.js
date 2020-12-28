import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {styled} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const axios = require('axios');

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 8,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: 8,
    fontFamily: 'Raleway',
    color: 'white',
    height: 38,
    padding: '0 30px',
  });


function Register() {
    const[user, setUser] = useState('');
    const[pass, setPass] = useState('');

    function handleUser(e) {
        setUser((prevUser) => {
            return e.target.value;
        });
    };

    function handlePass(e) {
        setPass((prevPass) => {
            return e.target.value;
        });
    };

    function SubmitForm() {
        const object = {username: user, password: pass};
        axios.post('http://localhost:5000/users/post', object)
        .then((res) => {
            if(res.status != 200) {
                console.log('Error' + res.json);
            }
            else {
                console.log("Registered!");            
            }
        })
    }




    return (
    <div>
        <h1>Register</h1>
        <Grid container>
            <Grid item>
                <TextField required variant="outlined" label="Username" onChange={e => handleUser(e)}></TextField>
            </Grid>
            <Grid item>
                <TextField required variant="outlined" label="Password" type="password" onChange={e => handlePass(e)}></TextField>
            </Grid>
        </Grid>
        <MyButton onClick={SubmitForm}>Register</MyButton>
    </div>);
}

export default Register