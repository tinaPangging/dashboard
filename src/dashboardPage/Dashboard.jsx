import { useState } from "react";
import Button from "@material-ui/core/Button";

const Dashboard = props => {

  return (
      <>
      welcome to my Dashboard
    <Button
      onClick={e => {
        e.preventDefault();
        props.history.push('/login');
      }}
    >
      Log out
    </Button>
    </>
  );
};

export default Dashboard;
