import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";

const Navbar = props => {
  const { history, isAuthenticated, setIsAuthenticated, user } = props;
  console.log(user,'user')
  return (
    <AppBar style={{ background: "black" }}>
      <Toolbar>
      <div style={{ flex: 1 }} />
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
       
        {isAuthenticated && (
          <Link
            href={"/dashboard"}
            onClick={e => {
              e.preventDefault();
              history.push("/dashboard");
            }}
            style={{ color: "#f5a940", padding: 10 }}
          >
            Dashboard
          </Link>
        )}

        {isAuthenticated ? (
          <Link
            href={"/login"}
            onClick={e => {
              e.preventDefault();
              sessionStorage.removeItem("auth-token");
              setIsAuthenticated(false);
              history.push("/login");
            }}
            style={{ color: "#f5a940", paddingRight: 10 }}
          >
            Logout
          </Link>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
