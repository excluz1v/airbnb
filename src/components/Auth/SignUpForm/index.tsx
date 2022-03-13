import { FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useFirebaseApp } from 'reactfire';
import PasswordInput from '../../Unknown/Inputs/PasswordInput';
import { UIContext } from '../../Unknown/UIContext';
import RegisterSchema from './validateSchema';

type ThandleSignInparams = {
  email: string;
  password: string;
  fullName: string;
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

const RegForm: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const classes = useStyles();
  const auth = useFirebaseApp().auth();

  const handleSignUp = async (values: ThandleSignInparams) => {
    const { email, password, fullName } = values;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      if (user) {
        await user.updateProfile({
          displayName: fullName,
        });
        setAlert({
          severity: 'info',
          message: 'Welcome on board 🚀',
          show: true,
        });
      } else
        setAlert({
          severity: 'warning',
          message: 'Something went wrong, try again later',
          show: true,
        });
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
          fullName: '',
          comfirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          await handleSignUp(values);
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
            <FormControl fullWidth error>
              <TextField
                fullWidth
                name="fullName"
                type="text"
                onChange={handleChange}
                value={values.fullName}
                variant="filled"
                label="Full Name"
                size="small"
                aria-describedby="fullname-error-text"
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </FormControl>
            <PasswordInput
              onChange={handleChange}
              label="Password"
              value={values.password}
              errors={errors.password}
              name="password"
            />
            <PasswordInput
              onChange={handleChange}
              label="Repeat password"
              value={values.comfirmPassword}
              errors={errors.comfirmPassword}
              name="comfirmPassword"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegForm;
