import { useState } from "react";
import Button from "@material-ui/core/Button";
import { credentials } from "../data/credentials";
import jwt from "jsonwebtoken";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    btnDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btn:{
        color: '#edca82', 
        borderRadius: '20px', 
        backgroundColor: '#674932', 
        paddingLeft: 25, 
        paddingRight: 25, 
        paddingTop: 5, 
        paddingBottom: 5 
    },
    smLogin: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        padding: 50,
        backgroundColor: 'white',
        boxShadow: '1px 1px 25px 10px #674932',
        borderRadius: '5px'
    },
    xslogin: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        padding: 20,
        backgroundColor: 'white',
        boxShadow: '1px 1px 25px 10px #674932',
        borderRadius: '5px'
    },
    textField: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#674932"
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#674932"
        },
        "& .MuiOutlinedInput-input": {
            color: "#674932"
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#674932"
        },
    },
    error:{
        color: 'red', 
        paddingLeft: 50 
    }
}));

const Login = props => {
    const { setIsAuthenticated } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)
    const classes = useStyles();
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down("xs"));

    //validating the input email and password and generating error messages if the validate fails
    const validateForm = (email, password) => {
        let errors = {};
        if (!email) {
            errors.email = "Email id can not be empty"
        }
        if (!password) {
            errors.password = "Please provide a password"
        }
        return errors;
    };

    
    /* if the email and password are present in the predefined credentials array, auth token is generated with the secret key
     * and stored in session storage.
     * if the email id and password dont match, throws an error 
    */

    const handleSubmit = e => {
        e.preventDefault();
        let errors = validateForm(email, password);
        let match = false
        if (Object.keys(errors).length !== 0) {
            setError(errors)
        }
        else {
            credentials.forEach(user => {
                if (email === user.email && password === user.password) {
                    match = true
                    const token = jwt.sign({ email: email, firstname: user.firstName, lastname: user.lastName }, "this!is@our#secret$to%the^dashboard*");
                    sessionStorage.setItem("auth-token", token);
                    setIsAuthenticated(true)
                    props.history.push("/dashboard");
                }
            }
            );
            if (!match) {
                setError({ errorMsg: "Incorrect email and/or password. Please try again !" })
            }
        }

    };

    //displays the login form
    
    return (
        <Grid style={{ marginTop: 140 }} justify="center" alignItems="center" container>
                <form onSubmit={handleSubmit} className={isXS ? classes.xslogin : classes.smLogin}>
                    <TextField
                        placeholder="email"
                        onChange={e => { setEmail(e.target.value); setError({ ...error, email: "", errorMsg: "" }) }}
                        variant="outlined"
                        fullWidth
                        error={error && error.email ? true : false}
                        helperText={error && error.email ? error.email : ""}
                        className={classes.textField}
                    />
                    <TextField variant="outlined"
                        placeholder="password"
                        type="password"
                        onChange={e => { setPassword(e.target.value); setError({ ...error, password: "", errorMsg: "" }) }}
                        error={error && error.password ? true : false}
                        helperText={error && error.password ? error.password : ""}
                        fullWidth
                        className={classes.textField}
                    />
                    {error && error.errorMsg &&
                        <p className={classes.error}>{error.errorMsg}</p>
                    }

                    <div className={classes.btnDiv}>
                        <Button type="submit" className={classes.btn}>Submit</Button>
                    </div>
                </form>
        </Grid>

    );
};

export default Login;
