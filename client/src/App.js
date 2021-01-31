import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import authAction from "./Actions/authActions";
import { loadUser } from "./Actions/userActions";
import AwaitingVerification from "./Components/Containers/AwaitingVerification.js";
import Confirmation from "./Components/Containers/Confirmation.js";
import LandingPage from "./Components/Containers/LandingPage.js";
import Login from "./Components/Containers/Login.js";
import Profile from "./Components/Containers/Profile.js";
import Register from "./Components/Containers/Register.js";
import PageWrapper from "./Components/Specialized/PageWrapper.js";
import ProtectedRoute from "./Components/Specialized/ProtectedRoutes.js";
import allReducers from "./Reducers/allReducers.js";

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
          <PageWrapper>
            <Switch>
              <Route path="/confirm/:id" component={Confirmation} />
              <Route path="/verify" component={AwaitingVerification} />
              <ProtectedRoute path="/profile" component={Profile} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" component={LandingPage} />
            </Switch>
          </PageWrapper>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
