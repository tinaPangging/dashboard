import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  description: {
    marginTop: 50,
    fontSize: "18px",
    color: "#674932"
  },
  descriptionXS: {
    color: "#674932"
  },
  linkText: {
    color: "#c5a287",
    cursor: "pointer"
  },
  link: {
    textDecoration: "none"
  },
  mainBody: {
    padding: 20,
    width: "900px",
    textAlign: "justify",
    fontFamily: "Optima",
    backgroundColor: "white",
    boxShadow: "1px 1px 25px 10px #674932",
    borderRadius: "5px"
  },
  hr: {
    height: "4px",
    borderWidth: "0",
    backgroundColor: "#c5a287",
    borderRadius: "3px"
  }
}));

// displays the description of the application with an image

const LandingPage = props => {
  const { isAuthenticated } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      style={{ marginTop: 120 }}
      justify="center"
      alignItems="center"
      container
    >
      <Grid className={classes.mainBody}>
        <hr className={classes.hr} />
        <Grid spacing={3} style={{ padding: 20 }} container>
          <Grid
            sm={6}
            xs={12}
            className={isXS ? classes.descriptionXS : classes.description}
            item
          >
            The application allows user to view a dashboard displaying 50
            profiles with profile image, name and age with pagination (only 10
            profiles per page).
            <p />
            User can {""}
            <span
              onClick={e => {
                e.preventDefault();
                props.history.push("/login");
              }}
              className={classes.linkText}
            >
              login
            </span>
            {""} to the application with the credentials provided. Once logged out
            user will no longer have access to the dashboard page.
          </Grid>
          <Grid sm={6} xs={12} item>
            <CardActionArea>
              <CardMedia image="image.jpg" title="background" component="img" />
            </CardActionArea>
          </Grid>
        </Grid>
        <hr className={classes.hr} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
