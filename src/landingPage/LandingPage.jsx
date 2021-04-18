import Button from "@material-ui/core/Button";

const LandingPage = props => {
  return (
    <Button
      onClick={e => {
        e.preventDefault();
        props.history.push('/login');
      }}
    >
      Login
    </Button>
  );
};

export default LandingPage;
