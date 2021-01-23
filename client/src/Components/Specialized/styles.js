import {styled} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";

const MyButton = styled(Button)({
    background: '#25a6ff',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px',
    margin: 8,
    fontFamily: 'Raleway',
    color: 'white',
    height: 38,
    padding: '0 30px',
  });

const MyTextField = styled(TextField)({
    color: 'white',
    margin: 8
});

const MyBox = styled(Box)({
  background: 'white',
  borderRadius: 6
});

export  {MyButton, MyTextField, MyBox};
