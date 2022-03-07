import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import { UIContext } from '../../../Unknown/UIContext';
import LoginSchema from './validateSchema';
import { ThandleSignInparams } from '../../../../../types';
import PasswordInput from '../../Inputs/PasswordInput';
import EmailInput from '../../Inputs/EmailInput';

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
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();
  const auth = useFirebaseApp().auth();

  async function handleSignIn(values: ThandleSignInparams) {
    const { email, password } = values;
    setDisabled(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setAlert({ severity: 'info', message: 'Success', show: true });
    } catch (err) {
      let message = 'Unknown Error';
      if (err instanceof Error) message = err.message;
      setAlert({ severity: 'error', message, show: true });
      setDisabled(false);
    }
  }

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
            <EmailInput
              onChange={handleChange}
              value={values.email}
              errors={errors.email}
              touched={touched.email}
            />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
              errors={errors.password}
              touched={touched.password}
            />
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
