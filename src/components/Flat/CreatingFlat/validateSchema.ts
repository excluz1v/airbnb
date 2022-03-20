import * as Yup from 'yup';

const MAX_DESCRIPTION_LENGTH = 300;
const MAX_PRICE = 1000000;

const CreateFlatSchema = Yup.object().shape({
  address: Yup.string().strict().ensure().required('Required field'),
  description: Yup.string().trim().max(MAX_DESCRIPTION_LENGTH),
  price: Yup.number()
    .max(1000000, `max price is ${MAX_PRICE}`)
    .required('Required field')
    .integer('only integer')
    .positive('only positive number'),
});

export default CreateFlatSchema;
