
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

const LandingPage = props => {
 const { isAuthenticated} = props;

  return (
      <Grid style={{marginTop:90}}>
          Welcome to Loading page
          { !isAuthenticated && 
          <Button
          onClick={e => {
            e.preventDefault();
            props.history.push('/login');
          }}
        >
          Login
        </Button>
        }
  
    </Grid>
  );
};

export default LandingPage;
