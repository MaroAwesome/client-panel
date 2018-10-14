import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    console.log(store.firebaseAuthIsReady);
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/clients/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
