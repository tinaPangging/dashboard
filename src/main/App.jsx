import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "../landingPage/LandingPage";
import Login from "../loginPage/LoginPage";
import Dashboard from "../dashboardPage/Dashboard";
import Navbar from "../navbar/Navbar";
import jwt from "jsonwebtoken";

const App = props => {

  // initializing isAuthenticated, if auth token is present setting it to true else false  
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("auth-token") ? true : false
  );
  const [user, setUser] = useState([]);

  //checks isAuthenticated, checks if the credentials are valid, gets the user details
  useEffect(() => {
    if (sessionStorage && sessionStorage.getItem("auth-token")) {
      const sessionStoredToken = sessionStorage.getItem("auth-token");
      try {
        let decoded = jwt.verify(
          sessionStoredToken,
          "this!is@our#secret$to%the^dashboard*"
        );
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error.message, "error");
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]);

  return (
    <main>
      <Navbar
        history={props.history}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        user={user}
      />
      {/* adding routes for landing page, login page and dashboard
        * login page is accessed only when the user is not logged in, redirects to home page
        * if isAutenticated is false, the user does not have any access to dashboardpage, redirects to login page
      */}
     
      <Switch>
        <Route
          path="/home"
          render={props => (
            <LandingPage {...props} isAuthenticated={isAuthenticated} />
          )}
          exact
        />
        <Route
          path="/login"
          render={props =>
            {
              if (!isAuthenticated) {
                return (
                  <Login
                    {...props}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                );
              }
              else {
                return (
                  <Redirect to="/home"/>
                )
              }
            }
          }
        />
        <Route
          exact
          path="/dashboard"
          render={() => {
            if (isAuthenticated) {
              return (
                <Dashboard
                  to="/dashboard"
                  setIsAuthenticated={setIsAuthenticated}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route path="*">
          <Redirect to="/home" />
        </Route>
        />
      </Switch>
    </main>
  );
};

export default App;
