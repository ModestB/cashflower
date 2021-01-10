import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import equals from 'validator/lib/equals';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as actions from '../../../store/actions/actions';
import Material from '../../../shared/material';
import { whiteSpacesValidator } from '../../../shared/utilities';

const useStyles = makeStyles((theme) => ({
  form: theme.mixins.formColumn,
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validForm, setValidForm] = useState(false);
  const [validateUsername, setValidateUsername] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [validatePassword, setValidatePassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = () => {
    if (validForm) {
      dispatch(actions.registrationRequest(username, email, password));
    } else {
      setValidateUsername(true);
      setValidateEmail(true);
      setValidatePassword(true);
      setValidateConfirmPassword(true);
    }
  };

  const userNameErrorHandler = (msg) => {
    setValidUsername(false);
    setUsernameError(msg);
  };

  const usernameValidationHandler = () => {
    if (whiteSpacesValidator(username)) {
      userNameErrorHandler('No spaces are allowed in the username!');
      return;
    }
    if (!isAlphanumeric(username)) {
      userNameErrorHandler('Symbols are no allowed in the username!');
      return;
    }
    if (!isLength(username, { min: 5, max: 25 })) {
      userNameErrorHandler('Username must be atleast 5 characters and maximum length of 25!');
      return;
    }
    setValidUsername(true);
    setUsernameError('');
  };

  const emailValidationHandler = () => {
    if (!isEmail(email)) {
      setValidEmail(false);
      setEmailError('Please enter valid email!');
      return;
    }
    setValidEmail(true);
    setEmailError('');
  };

  const passwordValidationHandler = () => {
    const passwordValidationOption = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    };
    if (!isStrongPassword(password, passwordValidationOption)) {
      setValidPassword(false);
      setPasswordError('Password must be atleast 8 characters long, contain 1 uppercase, 1 lowercase character and 1 number!');
      return;
    }
    setValidPassword(true);
    setPasswordError('');
  };

  const confirmPasswordValidationHandler = () => {
    if (!equals(confirmPassword, password)) {
      setValidConfirmPassword(false);
      setConfirmPasswordError('Both passwords must be the same!');
      return;
    }
    setValidConfirmPassword(true);
    setConfirmPasswordError('');
  };

  useEffect(() => {
    if (validateUsername) {
      usernameValidationHandler();
    }
  }, [username, validateUsername]);

  useEffect(() => {
    if (validateEmail) {
      emailValidationHandler();
    }
  }, [email, validateEmail]);

  useEffect(() => {
    if (validatePassword) {
      passwordValidationHandler();
    }
  }, [password, validatePassword]);

  useEffect(() => {
    if (validateConfirmPassword) {
      confirmPasswordValidationHandler();
    }
  }, [confirmPassword, validateConfirmPassword]);

  useEffect(() => {
    if (
      validUsername &&
      validEmail &&
      validPassword &&
      validConfirmPassword
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [validUsername, validEmail, validPassword, validConfirmPassword]);

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <Material.TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        value={username}
        className={classes.formControl}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => setValidateUsername(true)}
        error={!validUsername && usernameError.length}
        helperText={usernameError}
      />
      <Material.TextField
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        className={classes.formControl}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setValidateEmail(true)}
        error={!validEmail && emailError.length}
        helperText={emailError}
      />
      <Material.TextField
        id="outlined-basic"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        value={password}
        className={classes.formControl}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setValidatePassword(true)}
        error={!validPassword && passwordError.length}
        helperText={passwordError}
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
      <Material.TextField
        id="outlined-basic"
        type={showPassword ? 'text' : 'password'}
        label="Confirm Password"
        variant="outlined"
        value={confirmPassword}
        className={classes.formControl}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => setValidateConfirmPassword(true)}
        error={!validConfirmPassword && confirmPasswordError.length}
        helperText={confirmPasswordError}
      />
      <Material.Box className={classes.buttonGrid}>
        <Material.Grid container spacing={2}>
          <Material.Grid item xs={12}>
            <Material.Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={submitHandler}
            >
              Register
            </Material.Button>
          </Material.Grid>
        </Material.Grid>
      </Material.Box>
    </form>
  );
}
