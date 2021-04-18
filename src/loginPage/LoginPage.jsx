import { useState } from "react";
import Button from "@material-ui/core/Button";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
     e.preventDefault();
  };


  const credentials = [
      { email: "admin@dash.com", password: "hereWeGo&098" },
      { email: "developer1@dash.com", password: "hereWeGoAgain&0987" },
      { email: "developer2@dash.com", password: "myApp&098" }
    ];

  return (
    <>
      welcome to Login page
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        ></input>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default Login;
