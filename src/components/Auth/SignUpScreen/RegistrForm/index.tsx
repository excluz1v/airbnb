import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useFirebaseApp } from 'reactfire';
import { UIContext } from '../../../Unknown/UIContext';
import PasswordInput from '../../Inputs/PasswordInput';
import EmailInput from '../../Inputs/EmailInput';
import NameInput from '../../Inputs/NameInput';

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
    const { email, password } = values;
    try {
      // await auth.createUserWithEmailAndPassword(email, password);
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
        // validationSchema={LoginSchema}
        onSubmit={async (values) => {
          console.log(values);
          // await handleSignIn(values);
        }}
      >
        {({ errors, touched, handleChange, values, isSubmitting }) => (
          <Form className={classes.form}>
            <EmailInput
              onChange={handleChange}
              value={values.email}
              errors={errors.email}
              touched={touched.email}
            />
            <NameInput
              onChange={handleChange}
              value={values.fullName}
              errors={errors.fullName}
              touched={touched.fullName}
            />
            <PasswordInput
              onChange={handleChange}
              label="Password"
              value={values.password}
              errors={errors.password}
              touched={touched.password}
            />
            <PasswordInput
              onChange={handleChange}
              label="Repeat password"
              value={values.comfirmPassword}
              errors={errors.comfirmPassword}
              touched={touched.comfirmPassword}
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
