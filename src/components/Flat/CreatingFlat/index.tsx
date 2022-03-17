import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';
import { useFirebaseApp, useFunctions } from 'reactfire';
import CreateFlatSchema from './validateSchema';
import AddressInput from '../AddressInput';

type Tprops = {
  open: boolean;
  setbackdrop: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreatingFlat(props: Tprops) {
  const { open, setbackdrop } = props;

  const handleClose = () => {
    setbackdrop(false);
  };
  const ww = useFirebaseApp().functions().httpsCallable('helloWorld');
  const functions = useFunctions();
  useEffect(() => {
    // const ww = functions.httpsCallable('helloWorld');
    ww()
      .then((r) => console.log(r))
      .catch((e) => console.log(e));

    // const qq = functions.httpsCallable('createFlat');
    //   qq({
    //     address: 'string',
    //     price: 4,
    //   })
    //     .then((res) => console.log(res))
    //     .catch((e) => console.log(e));
  });

  return (
    <div>
      <Dialog
        sx={{ color: '#fff', zIndex: 5 }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New Flat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in a simple form below to quickly add your flat to our
            platform. Don’t forget describing all benefits to make our users
            choosing your flat.
          </DialogContentText>
          <Formik
            initialValues={{
              address: '',
              price: '',
              description: '',
            }}
            validationSchema={CreateFlatSchema}
            onSubmit={async (values) => {}}
          >
            {({ errors, handleChange, values, isSubmitting }) => (
              <Form>
                <FormControl fullWidth error>
                  <AddressInput name="address" />
                  <TextField
                    name="price"
                    type="text"
                    onChange={handleChange}
                    value={values.price}
                    variant="standard"
                    label="Price per night, $"
                    size="small"
                    aria-describedby="price-error-text"
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                  <TextField
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={values.description}
                    variant="standard"
                    label="Description"
                    size="small"
                    aria-describedby="description-error-text"
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="text"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={handleClose}
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  variant="text"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  publish
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatingFlat;
