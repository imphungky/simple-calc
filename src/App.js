import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grades from './Components/Grades.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {styled} from "@material-ui/core/styles";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const MyBox = styled(Box)({
  background: 'white',
  borderRadius: 6
});

function App() {
  return (
    <Router>
      <Container className="Container" style={{textAlign: "center"}} fixed maxWidth="sm">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Grades}/>
          </Switch>
          
      </Container>
     </Router>
  );
}

export default App;
