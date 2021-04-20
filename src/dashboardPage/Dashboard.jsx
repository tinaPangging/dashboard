import { useState, useEffect } from "react";
import { Route, Switch , Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import jwt from "jsonwebtoken";
import Login from "../loginPage/LoginPage";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

const Dashboard = props => {
    const {setIsAuthenticated} = props;

return (
    <>
    <p style={{marginTop: 100}}>I m inside Dashboard 
      
    </p>

    </>
);
};
// export default Dashboard;

export default withRouter(Dashboard);
