import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import decode from "jwt-decode";

import NavigationBar from "./components/Layout/NavigationBar";
import Home from "./components/Layout/Home";
import Summoners from "./components/Summoners";
import Stats from "./components/Summoners/Stats";
import Footer from "./components/Layout/Footer";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import UserProfile from "./components/UserProfile";
import Error from "./components/Auth/Error";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const checkAuth = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  // const refreshToken = localStorage.getItem('refreshToken');
  // if (!token || !refreshToken) return false;
  if (!token) return false;
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) return false;
  } catch (e) {
    return false;
  }
  return true;
};

const AuthRoute = ({ component: Component, ...r }) => (
  <Route
    {...r}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const HideRoute = ({ component: Component, ...r }) => (
  <Route
    {...r}
    render={props =>
      !checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

// TODO: override ant-design font-family
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div>
            <NavigationBar />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/summoners" component={Summoners} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/stats" component={Stats} />
              <HideRoute path="/login" component={LogIn} />
              <HideRoute path="/signup" component={SignUp} />
              <AuthRoute path="/account" component={UserProfile} />
              <Route component={Error} />
            </Switch>
            <Footer />
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
