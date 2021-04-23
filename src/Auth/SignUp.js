import React, { useState } from 'react';
import { useFirebase } from '../Providers/FirebaseProvider';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(6),
  },
  textField: {
    borderRadius: 37,
  },
  submitButton: {
    color: 'white',
    margin: theme.spacing(5),
    fontWeight: 'bold',
    borderRadius: 50,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.hover,
    },
  },
  error: {
    color: theme.palette.secondary.main,
    fontFamily: 'Nunito',
    margin: theme.spacing(2),
  },
}))

export default function SignUp() {
  const classes = useStyles();
  const auth = useFirebase();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(auth.error);

  if (auth.loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
      </div>
    )
  }

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if (name === 'signup-userEmail') {
      setEmail(value)
    } else if (name === 'signup-userPhone') {
      setPhone(value)
    } else if (name === 'signup-userPassword') {
      setPassword(value)
    } else if (name === 'signup-displayName') {
      setDisplayName(value)
    }
  }


  const onSubmitForm = () => {
    auth.signup(displayName, phone, email, password)
  }

  return (
    <Container className={classes.paper} component="main" maxWidth="sm">
      <Avatar>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5" color="textPrimary">
        Sign Up
      </Typography>
      {
        error
          ? <Typography className={classes.error}>{error}</Typography>
          : false
      }
      <form noValidate onSubmit={onSubmitForm}>
        <TextField
          id="signup-name"
          label="Name"
          name="signup-displayName"
          value={displayName}
          margin="normal"
          required
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="signup-email"
          label="Email"
          name="signup-userEmail"
          value={email}
          margin="normal"
          required
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="signup-phone"
          label="Phone Number (optional)"
          name="signup-userPhone"
          value={phone}
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="signup-password"
          label="Password"
          name="signup-userPassword"
          value={password}
          margin="normal"
          type="password"
          variant="outlined"
          required
          fullWidth
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            className: classes.textField
          }}
        />
        <Button 
          className={classes.submitButton}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
        >
          Create Account
        </Button>
      </form>
      <Link href="/" variant="body2">
        Already have an account? Sign In
      </Link>
    </Container>
  );
}
