import { useState, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { initials } from "../utilities/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: "#674932",
    backgroundColor: "#edca82",
    fontSize: "15px",
    cursor: "pointer"
  },
  appBar: {
    background: "#674932"
  },
  homeLink: {
    color: "#edca82",
    fontSize: "20px"
  },
  dashboardLoginLink: {
    color: "#edca82",
    fontSize: "20px",
    padding: 10
  },
  userName:{
    fontSize: "13.5px", 
    color: "#5a5c5a" 
  },
  email:{
    fontSize: "11px", 
    color: "#9da19d" 
  },
  hr:{
    height: "1px",
    borderWidth: "0",
    backgroundColor: "#caccca"
  },
  logout:{
    fontSize: "12px",
    paddingLeft: 50,
    color: "#c5a287"
  }
}));

const Navbar = props => {
  const { history, isAuthenticated, setIsAuthenticated, user } = props;
  const classes = useStyles();
  const name = user.firstname + " " + user.lastname;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // return focus to the button when we transitioned from !open -> open

  //const prevOpen = useRef(open);

  const handleToggle = () => {
    //   console.log(prevOpen)
    setOpen(open => !open);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div style={{ flex: 1 }} />
        <Link
          href={"/home"}
          onClick={e => {
            e.preventDefault();
            history.push("/home");
          }}
          className={classes.homeLink}
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
            className={classes.dashboardLoginLink}
          >
            Dashboard
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <Avatar
              ref={anchorRef}
              className={classes.avatar}
              onClick={e => handleToggle(e)}
            >
              {initials(name)}
            </Avatar>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined}>
              <Paper style={{ paddingTop: 20 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem>
                      <Box>
                        <Box
                          className={classes.userName}
                          display="flex"
                          justifyContent="center"
                        >
                          {name}
                        </Box>
                        <Box className={classes.email}>
                          {user.email}
                        </Box>
                      </Box>
                    </MenuItem>
                    <hr className={classes.hr}/>
                    <MenuItem
                      className={classes.logout}
                      onClick={e => {
                        e.preventDefault();
                        sessionStorage.removeItem("auth-token");
                        setIsAuthenticated(false);
                        setOpen(false);
                        history.push("/login");
                      }}
                      
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>
          </>
        ) : (
            <Link
              href={"/login"}
              onClick={e => {
                e.preventDefault();
                history.push("/login");
              }}
              className={classes.dashboardLoginLink}
            >
              Login
          </Link>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
