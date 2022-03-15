import React from 'react';
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
import CreateFlatSchema from './validateSchema';

type Tprops = {
  open: boolean;
  setbackdrop: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreatingFlat(props: Tprops) {
  const { open, setbackdrop } = props;
  const handleClose = () => {
    setbackdrop(false);
  };

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
                  <TextField
                    name="address"
                    type="text"
                    onChange={handleChange}
                    value={values.address}
                    variant="standard"
                    label="Address"
                    size="small"
                    aria-describedby="address-error-text"
                    error={!!errors.address}
                    helperText={errors.address}
                  />
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
