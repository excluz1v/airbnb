import * as Yup from 'yup';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../../common/constants';

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH, `at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `${MAX_PASSWORD_LENGTH} characters is maximum`)
    .required('Required field'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    ' password must be the same',
  ),
  email: Yup.string().email('invalid email').required('Required field'),
});

export default RegisterSchema;
