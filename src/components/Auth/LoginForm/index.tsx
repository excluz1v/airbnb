import { FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useFirebaseApp } from 'reactfire';
import EmailInput from '../../Unknown/Inputs/EmailInput';
import PasswordInput from '../../Unknown/Inputs/PasswordInput';
import { UIContext } from '../../Unknown/UIContext';
import LoginSchema from './validateSchema';

type ThandleSignInparams = {
  email: string;
  password: string;
};

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
  const classes = useStyles();
  const auth = useFirebaseApp().auth();

  const handleSignIn = async (values: ThandleSignInparams) => {
    const { email, password } = values;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      let message = 'Unknown Error';
      if (err instanceof Error) message = err.message;
      setAlert({ severity: 'error', message, show: true });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          await handleSignIn(values);
        }}
      >
        {({ errors, handleChange, values, isSubmitting }) => (
          <Form className={classes.form}>
            <FormControl fullWidth error>
              <TextField
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email}
                variant="filled"
                label="Email"
                size="small"
                aria-describedby="email-error-text"
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>
            <PasswordInput
              onChange={handleChange}
              value={values.password}
              errors={errors.password}
              label="Password"
              name="password"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
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
