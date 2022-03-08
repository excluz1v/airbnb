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
  comfirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], ' password must be the same')
    .required('Required field'),
  email: Yup.string().email('invalid email').required('Required field'),
  fullName: Yup.string()
    .required('Required field')
    .test(
      'at leat 2 words in fullname',
      'full name should contain at least 2 words',
      function (value) {
        if (!value) return false;
        const trimValue = value.trim();
        const arr = trimValue.split(' ').filter((s) => s !== ' ');
        if (arr.length >= 2) return true;
        return false;
      },
    ),
});

export default RegisterSchema;
