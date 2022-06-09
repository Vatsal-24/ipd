import React, { useHistory } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    textAlign: "center",
  },
  paper: {
    width: "25%",
    margin: "auto",
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    textAlign: "center",
    backgroundColor: "#1976d2",
    margin: "auto",
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const classes = useStyles();
  // const history = useHistory();
  const submitButton = () => {
    console.log(email, password);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://items-cart.herokuapp.com/userlogin",
        {
          email: email,
        },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data === "User login failed")
          alert("No user found with this email. Please create a new account");
        // else history.push("./cart");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} elevation={6} square>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitButton}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
