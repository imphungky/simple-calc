import logo from './logo.svg';
import './App.css';
import Grades from './Components/Grades.js';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container className="Container" style={{textAlign: "center"}} fixed maxWidth="sm">
      <Box>
        <Grades></Grades>
      </Box>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     
     </Container>
  );
}

export default App;
