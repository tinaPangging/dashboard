import { Route, Switch } from "react-router-dom";
import LandingPage from '../landingPage/LandingPage';
import Login from "../loginPage/LoginPage";
import Dashboard from "../dashboardPage/Dashboard";

const App = props => {
  return (
    <main>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </main>
  );
};

export default App;
