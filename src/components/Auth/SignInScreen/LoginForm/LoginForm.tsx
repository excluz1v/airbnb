import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { UIContext } from '../../../Unknown/UIContext';
import LoginSchema from './validateSchema';
import { auth } from '../../../../common/firebaseApp';
import { ThandleSignInparams, ShowAlertParams } from '../../../../../types';

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: 'flex',
      rowGap: ' 2rem',
      flexWrap: 'wrap',
    },
  }),
);

const LoginForm: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();

  const showAlert = React.useCallback(
    (p: ShowAlertParams) => {
      const { type, mess } = p;
      setAlert({
        show: true,
        severity: type,
        message: mess,
      });
    },
    [setAlert],
  );

  async function handleSignIn(values: ThandleSignInparams) {
    const { email, password } = values;
    setDisabled(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      showAlert({ type: 'info', mess: 'Success' });
    } catch (err) {
      let message = 'Unknown Error';
      if (err instanceof Error) message = err.message;
      showAlert({ type: 'error', mess: message });
      setDisabled(false);
    }
  }

  const handleTogglePassword = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleSignIn(values);
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className={classes.form}>
            <TextField
              fullWidth
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              variant="filled"
              label="Email"
              size="small"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <TextField
              fullWidth
              name="password"
              type={showPass ? 'text' : 'password'}
              onChange={handleChange}
              value={values.password}
              variant="filled"
              label="Password"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {!showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              disabled={disabled}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
