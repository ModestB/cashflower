import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../../../store/actions/actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  cssLabel: {
    transform: 'translate(11px, 14px) scale(1)',
    color: theme.palette.grey[200],
    '&.Mui-focused': {
      color : theme.palette.grey[200],
    }
  },

  cssOutlinedInput: {
    color: theme.palette.grey[200],
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.grey[200],
    },
    '&:hover $notchedOutline': {
      borderColor: theme.palette.grey[200],
    }
  },

  cssFocused: {},

  input: {
    padding: "11px 14px",
  }, 

  notchedOutline: {  
    borderColor: theme.palette.grey[200]
  },
}));

export default function LoggedOut(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authLoading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const loginHandler = () => {
    if (!authLoading) dispatch(actions.authRequest(username, password));   
  };

  return (
    <React.Fragment>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField 
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              input: classes.input,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        <TextField 
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              input: classes.input,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </form>
      <Button color="inherit" onClick={loginHandler}>
        {
          !authLoading ?
          'Login'
          :
          <CircularProgress color='secondary' size={25}/>
        }
      </Button>     
    </React.Fragment>
  )
}