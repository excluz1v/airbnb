import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useFirebaseApp } from 'reactfire';
import { UIContext } from '../../../Unknown/UIContext';
import PasswordInput from '../../Inputs/PasswordInput';
import EmailInput from '../../Inputs/EmailInput';
import NameInput from '../../Inputs/NameInput';

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
              value={values.password}
              errors={errors.password}
              touched={touched.password}
            />
            <PasswordInput
              onChange={handleChange}
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegForm;
