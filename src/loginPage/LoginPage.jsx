import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { credentials } from "../data/credentials";
import jwt from "jsonwebtoken";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
       
    }
}));

const Login = props => {
    const { setIsAuthenticated, isAuthenticated } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)
    const classes = useStyles();

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

    
    const handleSubmit = e => {

        e.preventDefault();
        let errors = validateForm(email, password);
        let match = false
        if (Object.keys(errors).length !== 0) {
            // console.log(errors, 'errors');
            setError(errors)
        }
        else {
            credentials.forEach(user => {
                if (email === user.email && password === user.password) {
                    // console.log(user, "user");
                    match = true
                    const token = jwt.sign({ email: email }, "this!is@our#secret$to%the^dashboard*");
                    sessionStorage.setItem("auth-token", token);
                    setIsAuthenticated(true)
                    props.history.push("/dashboard");
                }
            }

            );
            if (!match) {
                setError({ errorMsg: "Incorrect email and/or password. Please try again" })
            }
        }

    };

    return (
        <Grid style={{ marginTop: 140 }} justify="center" alignItems="center" container>
            {/* welcome to Login page */}
            <form onSubmit={handleSubmit} className={classes.root}>
                <TextField
                    placeholder="email"
                    onChange={e => { setEmail(e.target.value); setError({ ...error, email: "", errorMsg: "" }) }}
                    variant="outlined"
                    fullWidth
                    error={ error &&  error.email ? true : false}
                    helperText={ error && error.email ? error.email : ""}
                />
                <TextField variant="outlined"
                    placeholder="password"
                    type="password"
                    onChange={e => { setPassword(e.target.value); setError({ ...error, password: "", errorMsg: "" }) }}
                    error={error && error.password ? true : false}
                    helperText={error && error.password ? error.password : ""}
                    fullWidth
                />
                {error && error.errorMsg &&
                    <p style={{ color: 'red', paddingLeft: 50 }}>{error.errorMsg}</p>
                }

                <div className={classes.btn}>
                    <Button type="submit" style={{ color: '#f5a940'}}>Submit</Button>
                </div>

            </form>
        </Grid>
    );
};

export default Login;
