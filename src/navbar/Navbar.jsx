import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

const Navbar = props => {
  const { history, isAuthenticated, setIsAuthenticated,user } = props;
 
 
  return (

    <AppBar style={{ background: 'black' }}>
      <Toolbar>
        <Link
          href={"/home"}
          onClick={e => {
            e.preventDefault();
            history.push("/home");
          }}
          style={{ color: "#f5a940" }}
        >
          Home
        </Link>
        <div style={{ flex: 1 }} />
        {isAuthenticated && 
         <Link
         href={"/dashboard"}
         onClick={e => {
           e.preventDefault();
           history.push("/dashboard");
         }}
         style={{ color: "#f5a940" }}
       >
         Dashboard
       </Link>
        }
       

        {isAuthenticated ?
          <Link
            href={"/login"}
            onClick={e => {
              e.preventDefault();
              sessionStorage.removeItem("auth-token");
              setIsAuthenticated(false);
              history.push("/login");
            }}
            style={{ color: "#f5a940", padding: 10 }}
          >
            Logout
       </Link> :
          <Link
            href={"/login"}
            onClick={e => {
              e.preventDefault();
              history.push("/login");
            }}
            style={{ color: "#f5a940", padding: 10 }}
          >
            Login
      </Link>
        }


      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
