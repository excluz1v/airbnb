import * as Yup from 'yup';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../common/constants';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH, `at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `${MAX_PASSWORD_LENGTH} characters is maximum`)
    .required('Required field'),
  email: Yup.string().email('invalid email').required('Required field'),
});

export default LoginSchema;
