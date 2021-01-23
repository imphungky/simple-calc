import React, {useEffect} from 'react';
import Login from './Components/Containers/Login.js';
import Register from './Components/Containers/Register.js';
import Profile from './Components/Containers/Profile.js';
import Confirmation from "./Components/Containers/Confirmation.js";
import LandingPage from "./Components/Containers/LandingPage.js";
import ProtectedRoute from "./Components/Specialized/ProtectedRoutes.js";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {applyMiddleware, createStore} from "redux";
import allReducers from "./Reducers/allReducers.js";
import {Provider} from "react-redux";
import { loadUser } from './Actions/userActions';
import authAction from "./Actions/authActions";
import thunk from "redux-thunk";
import ButtonAppBar from "./Components/Specialized/Nav.js";
import AwaitingVerification from './Components/Containers/AwaitingVerification.js';
import {CSSReset, ChakraProvider} from '@chakra-ui/react';

const store = createStore(allReducers, applyMiddleware(thunk));

function App() {

  useEffect(() => {
    store.dispatch(authAction(loadUser));
  }, []);




  return (
    <ChakraProvider>
        <CSSReset />
        <Provider store={store}>
            <Router>
              <ButtonAppBar/>
              <Switch>
                <Route path="/confirm/:id" component={Confirmation} />
                <Route path="/verify" component={AwaitingVerification} />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/" component={LandingPage} />
              </Switch>
            </Router>
        </Provider>
      </ChakraProvider>
  );
}

export default App;
