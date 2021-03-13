import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as actions from '../../../store/actions/actions';
import Material from '../../../shared/material';

const useStyles = makeStyles((theme) => ({
  form: theme.mixins.formColumn,
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authLoading = useSelector(state => state.user.loading);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!authLoading) dispatch(actions.authRequest(email, password));
  };

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={formSubmitHandler}
    >
      <Material.TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        className={classes.formControl}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Material.TextField
        id="outlined-basic"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        value={password}
        className={classes.formControl}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <Material.InputAdornment position="end">
              <Material.IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </Material.IconButton>
            </Material.InputAdornment>
          ),
        }}
      />
      <Material.Box className={classes.buttonGrid}>
        <Material.Grid container spacing={2}>
          <Material.Grid item xs={12}>
            <Material.Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              {
                !authLoading ?
                  'Login'
                  : <Material.CircularProgress color="secondary" size={25} />
              }
            </Material.Button>
          </Material.Grid>
        </Material.Grid>
      </Material.Box>
    </form>
  );
}
