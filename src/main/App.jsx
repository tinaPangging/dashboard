import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "../landingPage/LandingPage";
import Login from "../loginPage/LoginPage";
import Dashboard from "../dashboardPage/Dashboard";
import Navbar from "../navbar/Navbar";
import ProtectedRoute from "../authentication/ProtectedRoute";
import jwt from "jsonwebtoken";

const App = props => {

  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("auth-token")?true:false);
  const [user, setUser] = useState([]);


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
  }, [sessionStorage, sessionStorage.getItem("auth-token")]);

  return (
    <main>
      <Navbar
        history={props.history}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        user={user}
      />
      <Switch>
        {/* <Route path="/" component={LandingPage} exact /> */}
        {/* <Route path="/login" component={Login}/> */}
        <Route
          path="/home"
          render={props => (
            <LandingPage {...props} isAuthenticated={isAuthenticated}  />
          )}
          exact
        />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
        />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        {/* <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        /> */}
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
            }
            else{
             return <Redirect to="/login"/>
            }
          }}
        />
        <Route  path="*">
          <Redirect to="/home" />
        </Route>
        />
      </Switch>
    </main>
  );
};

export default App;
